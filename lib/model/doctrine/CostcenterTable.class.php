<?php

/**
 * CostcenterTable
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class CostcenterTable extends Doctrine_Table {

    /**
     * Returns an instance of this class.
     *
     * @return object CostcenterTable
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
                    array('name' => 'deleteable', 'type' => 'bool'),
                    array('name' => 'code', 'type' => 'string'),
                    array('name' => 'name', 'type' => 'string'),
                    array('name' => 'comment', 'type' => 'string'),
                    array('name' => 'parentid', 'type' => 'int'),
                    array('name' => 'path', 'type' => 'string'),
                    array('name' => 'icon', 'type' => 'string'),
                    array('name' => 'customicon')
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

    const table = 'Costcenter';
    const akfield = 'code';

    public static function getAllPaged($start, $limit, $filters, $simple = false) {
        $select = 'e.*, t.icon as customicon, "" as icon, (SELECT COUNT(q.id) FROM Account q WHERE q.costcenterid = t.id)<1 as deleteable';
        $query = BaseTable::getAllPaged(self::table, $start, $limit, $filters, array('t.Elements e'), array(), false, $select);
        if ($simple)
            return $query['results'];
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

    public static function duplicateByPK($pks) {
        $count = 0;
        foreach ($pks as $pk) {
            $obj = self::getInstance()->find($pk);

            $newobj = $obj->copy();

            $name = $newobj->getName();
            
			$testobj = true;
            do {
                $name = $name . ' (C)';
				
				$ak = Util::generateCode($name . $obj->getParentid());
                $testobj = self::getInstance()->findByAK($ak);
            }
			while ($testobj && $testobj->getId() > 0);

            $newobj->setName($name);
            $ak = Util::generateCode($newobj->getName() . $newobj->getParentid());
            $newobj->setCode($ak);

            $newobj->save();

            foreach ($obj->getCostcenterElementRelation() as $element) {
                $relation = new CostcenterElementRelation();
                $relation->setCostcenterId($newobj->getId());
                $relation->setElementId($element->getElementId());
                $relation->save();
            }

            $count++;
        }
        return $count;
    }

    public static function getByParent($filters = array(), $checkeable = false) {
        $select = 'p.*, e.*, 
            CONCAT("<b>", t.name, "</b>") as qtip, 
            t.name as text, 
            (SELECT COUNT(q.id) FROM Account q WHERE q.costcenterid = t.id)<1 as deleteable';
        return BaseTable::getByParent(self::table, $filters, $checkeable, $select, array('t.Costcenter p', 't.Elements e'));
    }

}