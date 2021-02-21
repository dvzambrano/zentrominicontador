<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage um
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class umActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);
        for ($index = 0; $index < count($filter); $index++)
            if ($filter[$index]->field == "elementid") {
                $relations = BaseTable::findByField("UmUmRelation", "from_id", $filter[$index]->value);
                $filter[$index]->value = array($filter[$index]->value);
                $filter[$index]->comparison = 'in';
                $filter[$index]->field = 'id';
                foreach ($relations as $relation)
                    $filter[$index]->value[] = $relation->getToId();
                break;
            }

        switch ($request->getParameter('component')) {
            case 'combo':
            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $rows = UmTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $um = array();
        $ak = Util::generateCode($request->getParameter('name'));

        if ($request->getParameter('id') != '')
            $um = Doctrine::getTable('Um')->find($request->getParameter('id'));

        if ($um == array()) {
            $um = Doctrine::getTable('Um')->findByAK($ak);
            if ($um)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('um.field.label', 'um.field.name', $request->getParameter('name'))
                        )));
            $um = new Um();
        }

        $um->setCode($ak);
        $um->setName($request->getParameter('name'));
        $um->setComment($request->getParameter('comment'));

        $um->save();
        sfContext::getInstance()->getLogger()->alert('Salvada unidad de medida ' . $um->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');

        $q = Doctrine_Query::create()
                ->delete('UmUmRelation')
                ->addWhere('from_id = ?', $um->getId());
        $deleted = $q->execute();

        if ($request->getParameter('equivalences') && $request->getParameter('equivalences') != '') {
            $equivalences = json_decode(stripslashes($request->getParameter('equivalences')));
            foreach ($equivalences as $equivalence) {
                $relation = new UmUmRelation();
                $relation->setFromId($um->getId());
                $relation->setToId($equivalence->umid);
                $relation->setRate($equivalence->amount);
                $relation->save();
            }
        }

        return $um->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Um')->deleteByPK($pks);
    }

}
