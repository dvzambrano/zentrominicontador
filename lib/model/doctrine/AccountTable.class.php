<?php

/**
 * AccountTable
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class AccountTable extends Doctrine_Table {

    /**
     * Returns an instance of this class.
     *
     * @return object AccountTable
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
                    array('name' => 'manualcode', 'type' => 'bool'),
                    array('name' => 'nature', 'type' => 'bool'),
                    array('name' => 'balance', 'type' => 'decimal'),
                    array('name' => 'customicon'),
                    array('name' => 'Costcenter')
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

    const table = 'Account';
    const akfield = 'code';

    public static function getAllPaged($start, $limit, $filters, $simple = false) {
        $select = 'e.*, t.icon as customicon, "" as icon, (SELECT COUNT(q.id) FROM Transaction q WHERE q.accountid = t.id)<1 as deleteable';
        $query = BaseTable::getAllPaged(self::table, $start, $limit, $filters, array(), array(), false, $select);
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

    public static function findByCcostcenterAndElement($costcenterid, $elementid) {
        $q = Doctrine_Query::create()
                ->select('t.*')
                ->from(self::table . ' t')
                ->where('t.costcenterid = ? AND t.elementid = ?', array($costcenterid, $elementid));

        return $q->fetchOne();
    }

    public static function getByParent($filters = array(), $checkeable = false) {
        $select = 'a.*, cc.*, el.*,
            CONCAT("<b>", t.name, "</b>") as qtip, 
            t.name as text, 
            t.costcenterid || t.elementid as virtual,
            (SELECT COUNT(q.id) FROM Transaction q WHERE q.accountid = t.id)<1 as deleteable';
        return BaseTable::getByParent(self::table, $filters, $checkeable, $select, array('t.Account a', 't.Costcenter cc', 't.Element el'));
    }

//    public static function getByParent($pk, $query, $checkeable, $fromdate = false, $todate = false, $balancerecursive = false) {
//        $q = Doctrine_Core::getTable(self::table)->createQuery('l');
//
//        if ((!isset($query) || !$query || $query == '') && (!isset($pk) || !$pk || $pk == '' || $pk == 'NULL'))
//            $q = $q->addWhere('l.parentid is NULL');
//        else
//        if (is_numeric($pk))
//            $q = $q->addWhere('l.parentid = ?', $pk);
//
//        if ($query && $query != '') {
//            $customquery = '';
//            $querysplited = str_split($query);
//            foreach ($querysplited as $letter)
//                $customquery = $customquery . '/' . $letter;
//
//            $q = $q->andWhere('l.name LIKE ? OR l.path LIKE ?', array('%' . $query . '%', '%/NULL' . $customquery . '%'));
//
//
//            $ids = array();
//            $all = $q->execute();
//            foreach ($all as $value) {
//                if ($value->getId())
//                    array_push($ids, $value->getId());
//                $temp = $value->getAccount();
//                while ($temp->getParentid() && $temp->getParentid() != '') {
//                    array_push($ids, $temp->getParentid());
//                    $temp = $temp->getAccount();
//                }
//            }
//            $ids = array_unique($ids);
//            if (count($ids) > 0)
//                $q = $q->andWhere('l.parentid NOT IN ? AND l.id IN ? OR l.parentid is NULL', array($ids, $ids));
//        }
//
//        if ($fromdate || $todate) {
//            if ($fromdate) {
//                $fromdate = date_create_from_format('d/m/Y H:i:s', $fromdate . ' 00:00:00')->format('Y-m-d H:i:s');
//            }
//            if ($todate) {
//                $todate = date_create_from_format('d/m/Y H:i:s', $todate . ' 23:59:59')->format('Y-m-d H:i:s');
//            }
//        }
//
//        $rows = $q->execute();
//
//        $res = array();
//        $pos = 0;
//        foreach ($rows as $row) {
//            $res[] = $row->toArray();
//            $res[$pos]['leaf'] = count($row->getAccounts()) == 0;
//            $res[$pos]['id'] = $row->getId();
//            $res[$pos]['text'] = $row->getName();
//
//            $res[$pos]['qtip'] = '<b>' . $row->getName() . '</b>';
//
//            $array = $row->getAccount()->toArray();
//            while ($array['Account']) {
//                $res[$pos]['qtip'] = $array['name'] . ' > ' . $res[$pos]['qtip'];
//                $array = $array['Account'];
//            }
//
//            $res[$pos]['fancytext'] = $row->getFancyText();
//
//            $res[$pos]['parent'] = '';
//            if ($row->getAccount() && $row->getAccount()->getId() > 0)
//                $res[$pos]['parent'] = $row->getAccount()->getName();
//
//            $res[$pos]['virtual'] = $row->isVirtual();
//
//            if ($row->getCostcenter() && $row->getCostcenter()->getId() > 0)
//                $res[$pos]['costcenter'] = $row->getCostcenter()->toArray();
//
//            if ($row->getElement() && $row->getElement()->getId() > 0) {
//                $res[$pos]['element'] = $row->getElement()->toArray();
//                $res[$pos]['element']['debitave'] = $row->getElement()->getDebitAverage();
//                $res[$pos]['element']['amount'] = 0;
//                if ($row->getCostcenter() && $row->getCostcenter()->getId() > 0)
//                    $res[$pos]['element']['amount'] = $row->getElement()->getAmountInCostcenter($row->getCostcenter()->getId());
//            }
//
//            $res[$pos]['balance'] = $row->getBalance($fromdate, $todate, $balancerecursive);
//            $res[$pos]['balancestr'] = Util::getNumberSpell($res[$pos]['balance']);
//
//            $res[$pos]['deleteable'] = !$row->isUsed();
//
//            $pos++;
//        }
//
//        return $res;
//    }
}