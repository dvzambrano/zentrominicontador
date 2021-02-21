<?php

/**
 * ElementTable
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class ElementTable extends Doctrine_Table {

    /**
     * Returns an instance of this class.
     *
     * @return object ElementTable
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
                    array('name' => 'umid', 'type' => 'int'),
                    array('name' => 'deleteable', 'type' => 'bool'),
                    array('name' => 'entityid', 'type' => 'int'),
                    array('name' => 'Accounts'),
                    array('name' => 'Transactions'),
                    array('name' => 'CostcenterElementRelation'),
                    array('name' => 'ElementElementRelation')
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

    const table = 'Element';
    const akfield = 'code';

    public static function getAllPaged($start, $limit, $filters, $simple = false) {
        $select = 'eer.*, umr.*, ';
        $joins = array('t.ElementElementRelation eer', 'eer.ToElement umr');
        $replacements = array();

        if (isset($filters["costcenterid"])) {
            $select .= 'ecr.*, ';
            $joins[] = 't.CostcenterElementRelation ecr';
            $replacements[] = array(
                'field' => 'costcenterid',
                'realfield' => 'costcenter_id',
                'char' => 'ecr'
            );

            // used to get element transactions to figure out the costcenter assest
            $select .= 'acc.*, tac.*, ';
            $joins[] = 't.Accounts acc';
            $joins[] = 'acc.Transactions tac';
            $replacements[] = array(
                'field' => 'costcenterid',
                'realfield' => 'costcenter_id',
                'char' => 'ecr'
            );
            $obj = new stdClass();
            $obj->type = "int";
            $obj->field = "accountcostcenterid";
            $obj->comparison = "eq";
            $obj->value = $filters["costcenterid"]->value;
            $filters[] = $obj;
            $replacements[] = array(
                'field' => 'accountcostcenterid',
                'realfield' => 'costcenterid',
                'char' => 'acc'
            );
        }
        if (isset($filters["fromdate"]) || isset($filters["todate"])) {
            $select .= 'com.*, ';
            $joins[] = 'tac.Comprobant com';

            if (isset($filters["fromdate"]))
                $replacements[] = array(
                    'field' => 'fromdate',
                    'realfield' => 'creationdate',
                    'char' => 'com'
                );
            if (isset($filters["todate"]))
                $replacements[] = array(
                    'field' => 'todate',
                    'realfield' => 'creationdate',
                    'char' => 'com'
                );
        }

        $select .= '
            (
            (SELECT COUNT(ccer.element_id) FROM CostcenterElementRelation ccer WHERE ccer.element_id = t.id)+
            (SELECT COUNT(eer1.to_id) FROM ElementElementRelation eer1 WHERE eer1.to_id = t.id)
            )<1 as deleteable';
        $query = BaseTable::getAllPaged(self::table, $start, $limit, $filters, $joins, $replacements, false, $select);
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
        $element = false;

        if (!$element && $array['code'] != '')
            $element = Doctrine::getTable('Element')->findByAK($array['code']);

        if (!$element && $array['id'] > 0) {
            $element = new Element();
            $element->fromArray($array);
            $element->save();
        }

        return $element;
    }

    //[getByParentMethod]
}