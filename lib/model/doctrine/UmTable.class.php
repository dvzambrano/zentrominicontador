<?php

/**
 * UmTable
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class UmTable extends Doctrine_Table {

    /**
     * Returns an instance of this class.
     *
     * @return object UmTable
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
                    array('name' => 'name', 'type' => 'string'),
                    array('name' => 'code', 'type' => 'string'),
                    array('name' => 'comment', 'type' => 'string'),
                    array('name' => 'value', 'type' => 'int'),
                    array('name' => 'period', 'type' => 'int'),
                    array('name' => 'customicon', 'type' => 'string'),
                    array('name' => 'deleteable', 'type' => 'bool')
                    , array('name' => 'UmUmRelation')
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

    const table = 'Um';
    const akfield = 'code';

    public static function getAllPaged($start, $limit, $filters, $simple = false) {
        $select = 'r.*, umr.*,
            (
            (SELECT COUNT(e.code) FROM Element e WHERE e.umid = t.id)+
            (SELECT COUNT(tt.id) FROM Transaction tt WHERE tt.umid = t.id)+
            (SELECT COUNT(rel.from_id) FROM UmUmRelation rel WHERE rel.to_id = t.id)
            )<1 as deleteable';
        $query = BaseTable::getAllPaged(self::table, $start, $limit, $filters, array('t.UmUmRelation r', 'r.ToUm umr'), array(), false, $select);
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
        $um = false;

        if (!$um && $array['code'] != '')
            $um = Doctrine::getTable('Um')->findByAK($array['code']);

        if (!$um && $array['id'] > 0) {
            $um = new Um();
            $um->fromArray($array);
            $um->save();
        }

        return $um;
    }

    //[getByParentMethod]
}