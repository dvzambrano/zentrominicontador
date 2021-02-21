<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage costcenter
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class costcenterActions extends sfBaseActions {

    public function executeRequest(sfWebRequest $request) {
        $response = array();
        try {
            switch ($request->getParameter('method')) {
                case 'duplicate':
                    $response = $this->duplicate($request);
                    $response = array('success' => true, 'message' => 'app.msg.info.savedsuccessful');
                    break;
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
                $rows = CostcenterTable::getInstance()->getAll($filter);
                break;

            case 'tree':
//                 hago la validacion para cuando se esta buscando un padre escribiendo y no seleccionando
                if (!$request->getParameter('query') || $request->getParameter('query') == '') {
                    $obj = new stdClass();
                    $obj->type = "int";
                    $obj->field = "parentid";
                    if ($request->getParameter('node') == '' || $request->getParameter('node') == 'NULL')
                        $obj->comparison = "null";
                    else {
                        $obj->comparison = "eq";
                        $obj->value = $request->getParameter('node');
                    }
                    $filter[] = $obj;
                }
                $rows = CostcenterTable::getInstance()->getByParent($filter, $request->getParameter('checkeable'));
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $costcenter = array();
        $ak = Util::generateCode($request->getParameter('name') . $request->getParameter('parentid') . $request->getParameter('entityid'));

        if ($request->getParameter('id') != '')
            $costcenter = Doctrine::getTable('Costcenter')->find($request->getParameter('id'));

        if ($costcenter == array()) {
            $costcenter = Doctrine::getTable('Costcenter')->findByAK($ak);
            if ($costcenter)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('costcenter.field.label', 'costcenter.field.name', $request->getParameter('name'))
                        )));
            $costcenter = new Costcenter();
        }
        else {
            $testobj = Doctrine::getTable('Costcenter')->findByAK($ak);
            if ($testobj && ($request->getParameter('id') == '' || $testobj->getName() != $costcenter->getName()))
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('costcenter.field.label', 'costcenter.field.name', $request->getParameter('name'))
                        )));
        }

        $costcenter->setCode($ak);
        $costcenter->setName($request->getParameter('name'));
        $costcenter->setComment($request->getParameter('comment'));

        if ($request->getParameter('parent_id') && $request->getParameter('parent_id') != '')
            $costcenter->setParentid($request->getParameter('parent_id'));
        else
            $costcenter->setParentid(null);
        
        if ($request->getParameter('entityid') && $request->getParameter('entityid') != '')
            $costcenter->setEntityid($request->getParameter('entityid'));
        else
            $costcenter->setEntityid(null);

        $costcenter->unlink('Elements');
        if ($request->getParameter('elementsids') && $request->getParameter('elementsids') != '') {
            $pks = explode(",", $request->getParameter('elementsids'));
            $costcenter->link('Elements', $pks);
        }

        $costcenter->save();
        sfContext::getInstance()->getLogger()->alert('Salvado negocio ' . $costcenter->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');

        if ($request->getParameter('path') && $request->getParameter('path') != '') {
            $costcenter->setPath($request->getParameter('path') . '/' . $costcenter->getId());
            $costcenter->save();
        }

        return $costcenter->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Costcenter')->deleteByPK($pks);
    }

    public function duplicate(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Costcenter')->duplicateByPK($pks);
    }
    
}
