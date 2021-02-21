<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage testing
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class testingActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        if ($request->getParameter('query'))
            $query->query = $request->getParameter('query');
        if ($request->getParameter('is_active'))
            $query->is_active = $request->getParameter('is_active');

        switch ($request->getParameter('component')) {
            
            case 'combo':
                $distinct = false;
                if ($request->getParameter('distinct') && $request->getParameter('distinct') != '')
                    $distinct = json_decode($request->getParameter('distinct'));

                $rows = TestingTable::getInstance()->getAll($query->query, $distinct);
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $filter = json_decode(stripslashes($request->getParameter('filter')));

                if ($request->getParameter('entityid') && $request->getParameter('entityid')!=''){
                    $obj = new stdClass();
                    $obj->type = "int";
                    $obj->field = "entityid";
                    $obj->comparison = "eq";
                    $obj->value = $request->getParameter('entityid');
                    $filter[] = $obj;
                }

                $rows = TestingTable::getInstance()->getAllPaged($start, $limit, $query, $filter);
                break;

            case 'tree':
                $id = $request->getParameter('node');
                $checkeable = $request->getParameter('checkeable');
                $query = $request->getParameter('query');
                $rows = TestingTable::getInstance()->getByParent($id, $query, $checkeable);
                if ($request->getParameter('customParam') != '')
                    $rows = TestingTable::getInstance()->getByParent($id, $query, $checkeable);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $testing = array();
        $ak = Util::generateCode($request->getParameter('name'));

        if ($request->getParameter('id') != '')
            $testing = Doctrine::getTable('Testing')->find($request->getParameter('id'));

        if ($testing == array()) {
            $testing = Doctrine::getTable('Testing')->findByAK($request->getParameter('name'));
            if ($testing)
                throw new Exception('app.error.duplicatedalternatekey');
            $testing = new Testing();
        }
        else {
            $testobj = Doctrine::getTable('Testing')->findByAK($request->getParameter('name'));
            if ($testobj && ($request->getParameter('id') == '' || $testobj->getName() != $testing->getname()))
                throw new Exception('app.error.duplicatedalternatekey');
        }

                $testing->setCode($ak);
        $testing->setName($request->getParameter('name'));
        $testing->setNick($request->getParameter('nick'));
        $testing->setComment($request->getParameter('comment'));
        $testing->setParentid($request->getParameter('parentid'));


        $testing->save();
        sfContext::getInstance()->getLogger()->alert('Salvad@ testing ' . $testing->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Testing')->deleteByPK($pks);
    }

}
