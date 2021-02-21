<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage element
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class elementActions extends sfBaseActions {

    public function executeRequest(sfWebRequest $request) {
        $response = array();
        try {
            switch ($request->getParameter('method')) {
//                case 'getdetails':
//                    $element = Doctrine::getTable('Element')->find($request->getParameter('id'));
//                    $fromdate = false;
//                    if ($request->getParameter('fromdate') && $request->getParameter('fromdate') != '')
//                        $fromdate = $request->getParameter('fromdate');
//                    $todate = false;
//                    if ($request->getParameter('todate') && $request->getParameter('todate') != '')
//                        $todate = $request->getParameter('todate');
//                    $data = $element->getAmountInCostcenter($request->getParameter('costcenterid'), $fromdate, $todate);
//                    $response = array('success' => true, 'message' => 'app.msg.info.savedsuccessful', 'data' => $data);
//                    break;
                default:
                    return parent::executeRequest($request);
                    break;
            }
        } catch (Exception $e) {
            $response = array('success' => false, 'message' => $e->getMessage());
        }

        return $this->renderText(json_encode($response));
    }

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');

                if ($request->getParameter('costcenterid') && $request->getParameter('costcenterid') != '') {
                    $obj = new stdClass();
                    $obj->type = "int";
                    $obj->field = "costcenterid";
                    $obj->comparison = "eq";
                    $obj->value = $request->getParameter('costcenterid');
                    $filter["costcenterid"] = $obj;
                }

                if ($request->getParameter('fromdate') && $request->getParameter('fromdate') != '') {
                    $obj = new stdClass();
                    $obj->type = "date";
                    $obj->field = "fromdate";
                    $obj->comparison = "get";
                    $obj->value = $request->getParameter('fromdate');
                    $filter["fromdate"] = $obj;
                }
                if ($request->getParameter('todate') && $request->getParameter('todate') != '') {
                    $obj = new stdClass();
                    $obj->type = "date";
                    $obj->field = "todate";
                    $obj->comparison = "let";
                    $obj->value = $request->getParameter('todate');
                    $filter["todate"] = $obj;
                }

                $rows = ElementTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $element = array();
        $ak = Util::generateCode($request->getParameter('name') . $request->getParameter('entityid'));

        if ($request->getParameter('id') != '')
            $element = Doctrine::getTable('Element')->find($request->getParameter('id'));

        if ($element == array()) {
            $element = Doctrine::getTable('Element')->findByAK($ak);
            if ($element)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('element.field.label', 'element.field.name', $request->getParameter('name'))
                        )));
            $element = new Element();
        }

        $element->setCode($ak);
        $element->setName($request->getParameter('name'));
        $element->setComment($request->getParameter('comment'));

        if ($request->getParameter('um_id') && $request->getParameter('um_id') != '')
            $element->setUmid($request->getParameter('um_id'));

        if ($request->getParameter('entityid') && $request->getParameter('entityid') != '')
            $element->setEntityid($request->getParameter('entityid'));
        else
            $element->setEntityid(null);

        $element->save();
        sfContext::getInstance()->getLogger()->alert('Salvado elemento ' . $element->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');

        $q = Doctrine_Query::create()
                ->delete('ElementElementRelation')
                ->addWhere('from_id = ?', $element->getId());
        $deleted = $q->execute();

        if ($request->getParameter('equivalences') && $request->getParameter('equivalences') != '') {
            $equivalences = json_decode(stripslashes($request->getParameter('equivalences')));

            foreach ($equivalences as $equivalence) {
                $relation = new ElementElementRelation();
                $relation->setFromId($element->getId());
                $relation->setToId($equivalence->elementid);
                $relation->setRate($equivalence->amount);
                $relation->save();
            }
        }

        return $element->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Element')->deleteByPK($pks);
    }

}
