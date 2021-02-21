<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage closeup
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class closeupActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $rows = CloseUpTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $closeup = array();
        $ak = Util::generateCode($request->getParameter('creationdate') . $request->getParameter('entityid'));

        if ($request->getParameter('id') != '')
            $closeup = Doctrine::getTable('CloseUp')->find($request->getParameter('id'));

        if ($closeup == array()) {
            $closeup = Doctrine::getTable('CloseUp')->findByAK($ak);
            if ($closeup)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('closeup.field.label', 'closeup.field.name', $request->getParameter('creationdate') . ' ' . $request->getParameter('creationtime') . ': "' . $request->getParameter('comment') . '"')
                        )));
            $closeup = new CloseUp();
        }

        $closeup->setCode($ak);
        $closeup->setName($request->getParameter('creationdate'));
        $closeup->setComment($request->getParameter('comment'));

        $creationdate = date_create_from_format('d/m/Y', $request->getParameter('creationdate'))->format('Y-m-d H:i:s');
        $closeup->setCreationdate($creationdate);

        if ($request->getParameter('entityid') && $request->getParameter('entityid') != '')
            $closeup->setEntityid($request->getParameter('entityid'));
        else
            $closeup->setEntityid(null);

        $closeup->save();
        sfContext::getInstance()->getLogger()->alert('Salvado cierre ' . $closeup->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');

        return $closeup->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('CloseUp')->deleteByPK($pks);
    }

}
