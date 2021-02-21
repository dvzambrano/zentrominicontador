<?php

/**
 * ComprobantTable
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class ComprobantTable extends Doctrine_Table {

    /**
     * Returns an instance of this class.
     *
     * @return object ComprobantTable
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
                    array('name' => 'comment', 'type' => 'string'),
                    array('name' => 'customicon', 'type' => 'string'),
                    array('name' => 'creationdate', 'type' => 'date'),
                    array('name' => 'deleteable', 'type' => 'bool'),
                    array('name' => 'entityid', 'type' => 'int'),
                    array('name' => 'Transactions')
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

    const table = 'Comprobant';
    const akfield = 'code';

    public static function getAllPaged($start, $limit, $filters, $simple = false) {
        $select = 'trsc.*, acc.*, cur.*, um.*, cc.*, elem.*,
            t.is_modificable as deleteable';
        $query = BaseTable::getAllPaged(self::table, $start, $limit, $filters, array('t.Transactions trsc', 'trsc.Account acc', 'acc.Costcenter cc', 'acc.Element elem', 'trsc.Currency cur', 'trsc.Um um'), array(
                    array(
                        'field' => 'accountid',
                        'realfield' => 'id',
                        'char' => 'acc'
                    ),
                    array(
                        'field' => 'fromdate',
                        'realfield' => 'creationdate',
                        'char' => 't'
                    ),
                    array(
                        'field' => 'todate',
                        'realfield' => 'creationdate',
                        'char' => 't'
                    )
                        ), false, $select);
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

    public static function renum4Date($year, $month) {
        $query = Doctrine_Query::create()->from(self::table . ' t')
                ->where('t.name LIKE "' . $year . str_pad($month, 2, "0", STR_PAD_LEFT) . '%"');

        $comprobants = $query->orderBy('t.id ASC')->execute();
        $count = $query->count();

        $identifier = 1;
        foreach ($comprobants as $comprobant) {
            $comprobant->setName($year . str_pad($month, 2, "0", STR_PAD_LEFT) . Comprobant::CODE_SEPARATOR . str_pad($identifier, count(str_split($count)), "0", STR_PAD_LEFT));
            $comprobant->save();
            $identifier++;
        }
    }

    // for importing from filepurposes. DO NOT DELETE!
    public static function getRebuilded($array = array()) {
        $comprobant = false;

        if (!$comprobant && $array['code'] != '')
            $comprobant = Doctrine::getTable('Comprobant')->findByAK($array['code']);

        if (!$comprobant && $array['id'] > 0) {
            $comprobant = new Comprobant();
            $comprobant->fromArray($array);
            $comprobant->save();
        }

        return $comprobant;
    }

    //[getByParentMethod]
}