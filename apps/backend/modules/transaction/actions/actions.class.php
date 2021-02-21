<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage transaction
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class transactionActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        if ($request->getParameter('query'))
            $query->query = $request->getParameter('query');
        if ($request->getParameter('is_active'))
            $query->is_active = $request->getParameter('is_active');

        switch ($request->getParameter('component')) {
            case 'combo':
                $rows = TransactionTable::getInstance()->getAll($query->query);
                break;

            case 'summary':
                $rows = TransactionTable::getInstance()->getSummary($request->getParameter('personid'), $request->getParameter('todate'));
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $filter = json_decode(stripslashes($request->getParameter('filter')));

                if ($request->getParameter('entityid') && $request->getParameter('entityid') != '') {
                    $obj = new stdClass();
                    if ($request->getParameter('entityid') == 'null' || $request->getParameter('entityid') == 'notnull') {
                        $obj->type = "int";
                        $obj->field = "entityid";
                        $obj->comparison = $request->getParameter('entityid');
                    } else {
                        $obj->type = "int";
                        $obj->field = "entityid";
                        $obj->comparison = "eq";
                        $obj->value = $request->getParameter('entityid');
                    }
                    $filter[] = $obj;
                }

                if ($request->getParameter('todate') && $request->getParameter('todate') != '') {
                    $obj = new stdClass();
                    $obj->type = "date";
                    $obj->field = "creationdate";
                    $obj->comparison = "let";
                    $obj->value = $request->getParameter('todate');
                    $filter[] = $obj;
                }

                $rows = TransactionTable::getInstance()->getAllPaged($start, $limit, $query, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function executeReport(sfWebRequest $request) {
        $this->user = Doctrine::getTable('sfGuardUser')->retrieveByUsername($this->getUser()->getUsername());
        
        $fromdate = false;
        $this->fromdate = '';
        $todate = false;
        $this->todate = '';

        if ($request->getParameter('fromdate') && $request->getParameter('fromdate') != '') {
            $fromdate = date_create_from_format('d/m/Y H:i:s', $request->getParameter('fromdate') . ' 00:00:00')->format('Y-m-d H:i:s');
            $this->fromdate = $request->getParameter('fromdate');
        }

        if ($request->getParameter('todate') && $request->getParameter('todate') != '') {
            $todate = date_create_from_format('d/m/Y H:i:s', $request->getParameter('todate') . ' 23:59:59')->format('Y-m-d H:i:s');
            $this->todate = $request->getParameter('todate');
        }



        $q = Doctrine_Query::create()
                ->select('t.*, e.name')
                ->from('Element e')
                ->leftJoin('e.Transactions t');
        if ($fromdate || $todate) {
            $q = $q->leftJoin('t.Comprobant c');
            if ($fromdate)
                $q = $q->addWhere('c.creationdate >= ?', $fromdate);
            if ($todate)
                $q = $q->addWhere('c.creationdate <= ?', $todate);
        }
        $elements = $q->execute();

        $result = array();
        $elementtotal = 0;
        $pos = 0;
        foreach ($elements as $element) {

            $result[] = $element->toArray();
            $total = 0;
            foreach ($element['Transactions'] as $transaction)
                $total += ($transaction['credit'] - $transaction['debit']) / $transaction['rate'];
            $result[$pos]['index'] = $pos + 1;
            $result[$pos]['subtotal'] = $total;
            $elementtotal += $total;

//            print_r($result[$pos]);
//            echo '<hr/>';

            $pos++;
        }
//        die('<hr/>done!');

        $this->elements = $result;
        $this->elementtotal = $elementtotal;

// -----------------------------------------------------------------------------

        $q = Doctrine_Query::create()
                ->select('cc.*, a.*, t.*')
                ->from('Costcenter cc')
                ->leftJoin('cc.Accounts a')
                ->leftJoin('a.Transactions t');
        if ($fromdate || $todate) {
            $q = $q->leftJoin('t.Comprobant c');
            if ($fromdate)
                $q = $q->addWhere('c.creationdate >= ?', $fromdate);
            if ($todate)
                $q = $q->addWhere('c.creationdate <= ?', $todate);
        }
        $costcenters = $q->execute();

        $result = array();
        $costcentertotal = 0;
        $pos = 0;
        foreach ($costcenters as $costcenter) {

            $result[] = $costcenter->toArray();
            $total = 0;
            foreach ($costcenter['Accounts'] as $account)
                foreach ($account['Transactions'] as $transaction)
                    $total += ($transaction['credit'] - $transaction['debit']) / $transaction['rate'];
            $result[$pos]['index'] = $pos + 1;
            $result[$pos]['subtotal'] = $total;
            $costcentertotal += $total;

//            print_r($result[$pos]);
//            echo '<hr/>';

            $pos++;
        }
//        die('<hr/>done!');
        $this->costcenters = $result;
        $this->costcentertotal = $costcentertotal;
        
        $this->currencycode = Util::getMetadataValue('app_currencycode');
    }

}
