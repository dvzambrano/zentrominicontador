<?php

/**
 * TestingTable
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class TestingTable extends Doctrine_Table {

    /**
     * Returns an instance of this class.
     *
     * @return object TestingTable
     */
    public static function getInstance() {
        return Doctrine_Core::getTable(self::table);
    }

    public static function formatData($array, $page, $count = false) {
        $rows = array();

        $pos = 0;
        foreach ($array as $row) {
            $rows[] = $row->toArray();
            $rows[$pos]['deleteable'] = true;

            $pos++;
        }

        $rows = array(
            'metaData' => array(
                'idProperty' => 'id',
                'root' => 'data',
                'totalProperty' => 'results',
                'fields' => array(
                    array('name' => 'id', 'type' => 'int'),
                    array('name' => 'deleteable', 'type' => 'bool'),
                    array('name' => 'code', 'type' => 'string')
                ,array('name' => 'name', 'type' => 'string')
                ,array('name' => 'nick', 'type' => 'string')
                ,array('name' => 'comment', 'type' => 'string')
                ,array('name' => 'parentid', 'type' => 'int')
                ,array('name' => 'path', 'type' => 'string')
                ),
                'sortInfo' => array(
                    'field' => 'id',
                    'direction' => 'ASC'
                )
            ),
            'success' => true,
            'message' => 'app.msg.info.loadedsuccessful',
            'results' => $count,
            'data' => $rows,
            'page' => $page
        );
        return $rows;
    }

    const table = 'Testing';
    const akfield = 'name';

    public static function getAllPaged($start, $limit, $query, $filters) {
        $query = BaseTable::getAllPaged(self::table, $start, $limit, $query, $filters, true, self::akfield);
        return self::formatData($query['results'], $query['page'], $query['count']);
    }

    public static function findByAK($ak) {
        return BaseTable::findByAK(self::table, self::akfield, $ak);
    }

    public static function getAll($query, $distinct = false) {
        $q = Doctrine_Query::create()
                ->select('t.*')
                ->from(self::table . ' t');

        if ($distinct) {
            $where = '';
            $params = array();
            for ($i = 0; $i < count($distinct); $i++) {
                if ($i == 0)
                    $where = $where . 't.id != ?';
                else
                    $where = $where . ' AND t.id != ?';
                $params[] = $distinct[$i]->id;
            }
            $q->addWhere($where, $params);
        }

        if ($query && $query != '')
            $q->addWhere('t.name LIKE ?', array('%' . $query . '%'));

        return self::formatData($q->execute(), 1);
    }

    public static function deleteByPK($pks) {
        return BaseTable::deleteByPK(self::getInstance(), $pks);
    }

    public static function getByParent($pk, $query, $checkeable) {
        $q = '';

        if ($pk == '' || $pk == 'NULL')
            if ($query && $query != '')
                $q = Doctrine_Core::getTable(self::table)->createQuery('l')
                        ->where('l.name LIKE ?', '%' . $query . '%');
            else
                $q = Doctrine_Core::getTable(self::table)->createQuery('l')
                    ->where('l.code is NULL');
        else
        if ($query && $query != '')
            $q = Doctrine_Core::getTable(self::table)->createQuery('l')
                    ->where('l.id = ?', $pk);
        else
            $q = Doctrine_Core::getTable(self::table)->createQuery('l')
                    ->where('l.code = ?', $pk);

        $rows = $q->execute();

        $res = array();
        $pos = 0;
        foreach ($rows as $row) {
            $res[] = $row->toArray();
            $res[$pos]['leaf'] = count($row->getTestings())==0;
            $res[$pos]['id'] = $row->getId();
            $res[$pos]['text'] = $row->getName();

            $res[$pos]['parent'] = '';
            if ($row->getTesting())
                $res[$pos]['parent'] = $row->getTesting()->getName();

            $pos++;
        }

        return $res;
    }
}