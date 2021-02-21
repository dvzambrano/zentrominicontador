<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage currency
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class currencyActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $rows = CurrencyTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $currency = array();
        $ak = $request->getParameter('code');

        if ($request->getParameter('id') != '')
            $currency = Doctrine::getTable('Currency')->find($request->getParameter('id'));

        if ($currency == array()) {
            $currency = Doctrine::getTable('Currency')->findByAK($ak);
            if ($currency)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('currency.field.label', 'currency.field.code', $request->getParameter('code'))
                        )));
            $currency = new Currency();
        }

        $currency->setName($request->getParameter('name'));
        $currency->setCode($ak);
        $currency->setComment($request->getParameter('comment'));
        $currency->setRate($request->getParameter('rate'));
        if ($request->getParameter('isactive') == 'true')
            $currency->setIsactive(true);
        else
            $currency->setIsactive(false);

        $currency->save();
        sfContext::getInstance()->getLogger()->alert('Salvada moneda ' . $currency->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
        
        return $currency->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Currency')->deleteByPK($pks);
    }

}
