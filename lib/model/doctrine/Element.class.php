<?php

/**
 * Element
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    SGArqBase
 * @subpackage model
 * @author     MSc. Donel Vazquez Zambrano
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
class Element extends BaseElement {

    public function isUsed() {
        return $this->getAccounts()->count() > 0 ||
                $this->getTransactions()->count() > 0;
    }

    public function getIncomesQuery() {
        return Doctrine_Query::create()
                        ->select('t.*')
                        ->from('Transaction t')
                        ->leftJoin('t.Account a')
                        ->where('a.elementid = ? AND t.amount > 0 AND (t.credit = 0 AND t.debit >= 0)', $this->getId());
    }

    public function getOutgoingQuery() {
        return Doctrine_Query::create()
                        ->select('t.*')
                        ->from('Transaction t')
                        ->leftJoin('t.Account a')
                        ->where('a.elementid = ? AND t.amount > 0 AND (t.debit >= 0 AND t.credit > 0)', $this->getId());
    }

    public function getDebitAverage() {
        $array = array();

        $qincomes = $this->getIncomesQuery()
                ->addSelect('SUM(t.amount) as amounttotal, SUM(t.debit) as debittotal')
                ->addGroupBy('t.umid, t.currencyid');

        $incomes = $qincomes->execute()->toArray();

        for ($index = 0; $index < count($incomes); $index++) {
            $debit = $incomes[$index]['debittotal'] / $incomes[$index]['rate'] / $incomes[$index]['amounttotal'];
            $array[$incomes[$index]['umid']][$incomes[$index]['currencyid']] = $debit;
        }

        foreach ($array as $key => $um) {
            $result = 0;
            foreach ($um as $currency) {
                $result += $currency;
            }
            $array[$key]['debit'] = $result / count($um);
        }

        return $array;
    }

    public function getAmountInCostcenter($costcenterid = false, $fromdate = false, $todate = false) {
        $array = array();

        if ($costcenterid) {
            $qincomes = $this->getIncomesQuery()
                    ->leftJoin('t.Um u')
                    ->addSelect('SUM(t.amount) as amounttotal, u.name')
                    ->addWhere('a.costcenterid = ?', $costcenterid)
                    ->addGroupBy('t.umid');

            $qoutgoing = $this->getOutgoingQuery()
                    ->leftJoin('t.Um u')
                    ->addSelect('SUM(t.amount) as amounttotal, u.name')
                    ->addWhere('a.costcenterid = ?', $costcenterid)
                    ->addGroupBy('t.umid');

            if ($fromdate || $todate) {
                $qincomes = $qincomes->leftJoin('t.Comprobant c');
                $qoutgoing = $qoutgoing->leftJoin('t.Comprobant c');
                if ($fromdate) {
                    $qincomes = $qincomes->addWhere('c.creationdate >= ?', $fromdate);
                    $qoutgoing = $qoutgoing->addWhere('c.creationdate >= ?', $fromdate);
                }
                if ($todate) {
                    $qincomes = $qincomes->addWhere('c.creationdate <= ?', $todate);
                    $qoutgoing = $qoutgoing->addWhere('c.creationdate <= ?', $todate);
                }
            }

            $incomes = $qincomes->execute()->toArray();
            $outgoing = $qoutgoing->execute()->toArray();

            if (count($outgoing) > count($incomes)) {
                for ($index = 0; $index < count($outgoing); $index++) {
                    $freakval = 0;
                    if ($incomes[$index]['amounttotal'] && $incomes[$index]['amounttotal'] > 0)
                        $freakval = $incomes[$index]['amounttotal'];
                    $result = $freakval - $outgoing[$index]['amounttotal'];
                    $array[$outgoing[$index]['umid']] = array(
                        'amount' => $result
                    );
                }
            } else {
                for ($index = 0; $index < count($incomes); $index++) {
                    $freakval = 0;
                    if ($outgoing[$index]['amounttotal'] && $outgoing[$index]['amounttotal'] > 0)
                        $freakval = $outgoing[$index]['amounttotal'];
                    $result = $incomes[$index]['amounttotal'] - $freakval;
                    $array[$incomes[$index]['umid']] = array(
                        'amount' => $result
                    );
                }
            }
        }

        foreach ($array as $key => $value) {
            $um = Doctrine::getTable('Um')->find($key);
            if ($um && $um->getId() > 0) {
                $equivalences = $um->getUmUmRelation();
                foreach ($equivalences as $equivalence) {
                    $obj = new stdClass();
                    $obj->amount = $value['amount'] * $equivalence->getRate();

                    $array[$equivalence->getToId()] = $obj;
                }
            }
        }

        return $array;
    }

}