<?php

/**
 * CurrencyTable
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class CurrencyTable extends Doctrine_Table {

    /**
     * Returns an instance of this class.
     *
     * @return object CurrencyTable
     */
    public static function getInstance() {
        return Doctrine_Core::getTable(self::table);
    }

    public static function formatData($array, $page, $count = false) {
        return array(
            'metaData' => array(
                'idProperty' => 'id',
                'root' => 'data',
                'totalProperty' => 'results',
                'fields' => array(
                    array('name' => 'id', 'type' => 'int'),
                    array('name' => 'code', 'type' => 'string'),
                    array('name' => 'name', 'type' => 'string'),
                    array('name' => 'rate', 'type' => 'decimal'),
                    array('name' => 'isactive', 'type' => 'bool'),
                    array('name' => 'comment', 'type' => 'string'),
                    array('name' => 'base', 'type' => 'bool'),
                    array('name' => 'customicon', 'type' => 'string'),
                    array('name' => 'deleteable', 'type' => 'bool')
                ),
                'sortInfo' => array(
                    'field' => 'id',
                    'direction' => 'ASC'
                )
            ),
            'success' => true,
            'message' => 'app.msg.info.loadedsuccessful',
            'results' => $count,
            'data' => $array->toArray(),
            'page' => $page
        );
    }

    const table = 'Currency';
    const akfield = 'code';

    public static function getAllPaged($start, $limit, $filters, $simple = false) {
        $code = Util::getMetadataValue('app_currencycode');
        $select = '(SELECT COUNT(cr.code) FROM Currency cr WHERE t.code = "' . $code . '")>0 as base, 1 as deleteable';
        $query = BaseTable::getAllPaged(self::table, $start, $limit, $filters, array(), array(), false, $select);
        if ($simple)
            return $query['results']->toArray();
        return self::formatData($query['results'], $query['page'], $query['count']);
    }

    public static function findByAK($ak) {
        return BaseTable::findByAK(self::table, self::akfield, $ak);
    }

    public static function getAll($filters = array(), $simple = false) {
        return self::getAllPaged(0, PHP_INT_MAX, $filters, $simple);
    }

    public static function deleteByPK($pks) {
        return BaseTable::deleteByPK(self::getInstance(), $pks);
    }

    // for importing from filepurposes. DO NOT DELETE!
    public static function getRebuilded($array = array()) {
        $currency = false;

        if (!$currency && $array['code'] != '')
            $currency = Doctrine::getTable('Currency')->findByAK($array['code']);

        if (!$currency && $array['id'] > 0) {
            $currency = new Currency();
            $currency->fromArray($array);
            $currency->save();
        }

        return $currency;
    }

    //[getByParentMethod]
}