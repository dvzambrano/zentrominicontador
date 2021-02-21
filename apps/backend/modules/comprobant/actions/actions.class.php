<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage comprobant
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class comprobantActions extends sfBaseActions {

    public function executeRequest(sfWebRequest $request) {
        $response = array();
        try {
            switch ($request->getParameter('method')) {
                case 'moveassets':
                    $response = $this->moveassets($request);
                    break;
                case 'closecomprobant':
                    $response = array('success' => true, 'data' => $this->closecomprobant($request));
                    break;
                case 'destroyassets':
                    $response = $this->destroyassets($request);
                    break;
                case 'renum':
                    for ($index = 1; $index <= 12; $index++)
                        ComprobantTable::renum4Date("2018", $index);
                    die;
                    break;
                case 'test':
                    $query = Doctrine_Query::create()->from('Comprobant t')
                            ->where('t.name LIKE "201802%"');
                    $comprobant = $query->orderBy('t.id DESC')->fetchOne();

                    for ($index = 1; $index <= 12; $index++) {
                        print_r($comprobant->getNameInfo('2018-' . str_pad($index, 2, "0", STR_PAD_LEFT) . '-04 17:44:00'));
                        echo '<br/>';
                    }
                    die;
                    break;
                default:
                    return parent::executeRequest($request);
                    break;
            }
        } catch (Exception $e) {
            $response = array('success' => false, 'message' => $e->getMessage());
        }

        return $this->renderText(json_encode($response));
    }

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');

                if ($request->getParameter('entityid') && $request->getParameter('entityid') != '') {
                    $obj = new stdClass();
                    $obj->type = "int";
                    $obj->field = "entityid";
                    $obj->comparison = "eq";
                    $obj->value = $request->getParameter('entityid');
                    $filter[] = $obj;
                }

                if ($request->getParameter('accountid') && $request->getParameter('accountid') != '') {
                    $obj = new stdClass();
                    $obj->type = "int";
                    $obj->field = "accountid";
                    $obj->comparison = "eq";
                    $obj->value = $request->getParameter('accountid');
                    $filter[] = $obj;
                }

//                if ($request->getParameter('costcenterid') && $request->getParameter('costcenterid') != '') {
//                    $obj = new stdClass();
//                    $obj->type = "int";
//                    $obj->field = "costcenterid";
//                    $obj->comparison = "eq";
//                    $obj->value = $request->getParameter('costcenterid');
//                    $filter[] = $obj;
//                }

                if ($request->getParameter('fromdate') && $request->getParameter('fromdate') != '') {
                    $obj = new stdClass();
                    $obj->type = "date";
                    $obj->field = "fromdate";
                    $obj->comparison = "get";
                    $obj->value = $request->getParameter('fromdate');
                    $filter[] = $obj;
                }
                if ($request->getParameter('todate') && $request->getParameter('todate') != '') {
                    $obj = new stdClass();
                    $obj->type = "date";
                    $obj->field = "todate";
                    $obj->comparison = "let";
                    $obj->value = $request->getParameter('todate');
                    $filter[] = $obj;
                }

                $rows = ComprobantTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request, $log = false) {
        $comprobant = array();
        $ak = Util::generateCode($request->getParameter('creationdate') . $request->getParameter('creationtime') . $request->getParameter('comment') . $request->getParameter('entityid'));

        if ($request->getParameter('id') != '')
            $comprobant = Doctrine::getTable('Comprobant')->find($request->getParameter('id'));

        if ($comprobant == array()) {
            $comprobant = Doctrine::getTable('Comprobant')->findByAK($ak);
            if ($comprobant)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('comprobant.field.label', 'comprobant.field.name', $request->getParameter('creationdate') . ' ' . $request->getParameter('creationtime') . ': "' . $request->getParameter('comment') . '"')
                        )));
            $comprobant = new Comprobant();
        }

        $comprobant->setCode($ak);
        $comprobant->setComment($request->getParameter('comment'));

        $date = date_create_from_format('d/m/Y g:i A', $request->getParameter('creationdate') . ' ' . $request->getParameter('creationtime'));
        $creationdate = $date->format('Y-m-d H:i:s');
        $comprobant->setCreationdate($creationdate);

        $array = $comprobant->getNameInfo($creationdate);
        $comprobant->setName($array[0] . Comprobant::CODE_SEPARATOR . $array['next']);

        if ($request->getParameter('entityid') && $request->getParameter('entityid') != '')
            $comprobant->setEntityid($request->getParameter('entityid'));
        else
            $comprobant->setEntityid(null);

        $comprobant->setIsModificable(!($request->getParameter('ismodificable') && $request->getParameter('ismodificable') != ''));

        $comprobant->save();

        if (count(str_split($array['next'])) > count(str_split($array[1])))
            ComprobantTable::renum4Date($date->format('Y'), $date->format('m'));

        if (!$log)
            $log = 'Salvado comprobante';
        sfContext::getInstance()->getLogger()->alert($log . ' ' . $comprobant->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');

        $q = Doctrine_Query::create()
                ->delete('Transaction')
                ->addWhere('comprobantid = ?', $comprobant->getId());
        $deleted = $q->execute();

        if ($request->getParameter('transactions') && $request->getParameter('transactions') != '') {
            $transactions = json_decode(stripslashes($request->getParameter('transactions')));

            foreach ($transactions as $transaction) {
                $currency = Doctrine::getTable('Currency')->find($transaction->currencyid);

                $t = new Transaction();

                $t->setAccountid($transaction->accountid);

                $t->setComprobantid($comprobant->getId());
                $t->setComment($comprobant->getComment());

                $t->setDebit($transaction->debit);
                $t->setCredit($transaction->credit);
                $t->setCreditave($transaction->creditave);
                $t->setCurrencyid($currency->getId());
                $t->setRate($currency->getRate());

                if ($transaction->amount > 0 && $transaction->umid > 0) {
                    $t->setAmount($transaction->amount);
                    $t->setUmid($transaction->umid);
                }

                $t->save();
            }
        }

        return $comprobant->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Comprobant')->deleteByPK($pks);
    }

    public function closecomprobant(sfWebRequest $request) {
        $comprobant = Doctrine::getTable('Comprobant')->find($request->getParameter('id'));
        $comprobant->setIsModificable(false);
        $comprobant->save();

//        $transfer = array();
//        $accounts = array();
//
//        $closureconfig = Util::getMetadataValue('app_closureconfig');
//        if ($closureconfig && $closureconfig != '') {
//            $closureconfig = json_decode($closureconfig, true);
//            foreach ($closureconfig as $config) {
//                $fromaccount = Doctrine::getTable('Account')->find($config['fromaccount']['id']);
//                $nodes = Util::getArrayOrdered($fromaccount, array(), 'preorder', 'getAccounts');
//
//                if (!isset($transfer[$config['toaccount']['id']])) {
//                    $transfer[$config['toaccount']['id']] = array();
//                    $accounts[$config['toaccount']['id']] = $config['toaccount'];
//                }
//
//                foreach ($nodes as $value)
//                    array_push($transfer[$config['toaccount']['id']], $value['id']);
//            }
//        }
//
//        $array = array();
//        foreach ($comprobant->getTransactions() as $transaction)
//            foreach ($transfer as $key => $originaccount)
//                if (in_array($transaction->getAccountid(), $originaccount))
//                    array_push($array, array(
//                        'to' => $accounts[$key],
//                        'transaction' => $transaction->toArray()
//                    ));
//
//        return $array;
    }

    public function moveassets(sfWebRequest $request) {
        $request->setParameter('creationdate', date('d/m/Y'));
        $request->setParameter('creationtime', date('g:i A'));
        $request->setParameter('ismodificable', 'true');
        $request->setParameter('comment', 'Movimiento de elementos ' . date('d/m/Y H:i:s'));

        $transactions = array();

        if ($request->getParameter('elements') && $request->getParameter('elements') != '') {
            $elements = json_decode(stripslashes($request->getParameter('elements')));

            $currency = CurrencyTable::getInstance()->findByAK(Util::getMetadataValue('app_currencycode'));
            for ($index = 0; $index < count($elements); $index++) {
                $element = Doctrine::getTable('Element')->find($elements[$index]->id);
                $ave = $element->getDebitAverage();
                $ave = $ave[$elements[$index]->moveum]['debit'];

                $fromaccount = Doctrine::getTable('Account')->findByCcostcenterAndElement($request->getParameter('from'), $elements[$index]->id);
                $toaccount = Doctrine::getTable('Account')->findByCcostcenterAndElement($request->getParameter('to'), $elements[$index]->id);

                if ($fromaccount && $toaccount && $fromaccount->getId() > 0 && $toaccount->getId() > 0) {
                    $extraction = new stdClass();
                    $extraction->currencyid = $currency->getId();
                    $extraction->debit = 0;
                    $extraction->credit = $ave * $elements[$index]->amount;
                    $extraction->creditave = 0;
                    $extraction->amount = $elements[$index]->amount;
                    $extraction->umid = $elements[$index]->moveum;
                    $extraction->accountid = $fromaccount->getId();
                    $transactions[] = $extraction;

                    $deposit = new stdClass();
                    $deposit->currencyid = $currency->getId();
                    $deposit->debit = $ave * $elements[$index]->amount;
                    $deposit->credit = 0;
                    $deposit->creditave = 0;
                    $deposit->amount = $elements[$index]->amount;
                    $deposit->umid = $elements[$index]->moveum;
                    $deposit->accountid = $toaccount->getId();
                    $transactions[] = $deposit;
                } else
                    return array('success' => true, 'message' => 'costcenter.action.error.notocostcenterasociated');
            }
        }

        $request->setParameter('transactions', json_encode($transactions));

        $data = $this->save($request, 'Generado comprobante de transferencia');

        return array('success' => true, 'message' => 'app.msg.info.savedsuccessful', 'data' => $data);
    }

    public function destroyassets(sfWebRequest $request) {
        $request->setParameter('creationdate', date('d/m/Y'));
        $request->setParameter('creationtime', date('g:i A'));
        $request->setParameter('ismodificable', 'true');
        $request->setParameter('comment', 'Ajuste de elementos ' . date('d/m/Y H:i:s'));

        $transactions = array();

        $currency = CurrencyTable::getInstance()->findByAK(Util::getMetadataValue('app_currencycode'));

        $element = Doctrine::getTable('Element')->find($request->getParameter('elementid'));
        $ave = $element->getDebitAverage();
        $ave = $ave[$request->getParameter('umid')]['debit'];

        $fromaccount = Doctrine::getTable('Account')->findByCcostcenterAndElement($request->getParameter('costcenterid'), $request->getParameter('elementid'));

        if ($fromaccount && $fromaccount->getId() > 0) {
            $extraction = new stdClass();
            $extraction->currencyid = $currency->getId();
            $extraction->debit = $ave * $request->getParameter('amount');
            $extraction->credit = $ave * $request->getParameter('amount');
            $extraction->creditave = 0;
            $extraction->amount = $request->getParameter('amount');
            $extraction->umid = $request->getParameter('umid');
            $extraction->accountid = $fromaccount->getId();
            $transactions[] = $extraction;
        } else
            return array('success' => true, 'message' => 'costcenter.action.error.notocostcenterasociated');


        $request->setParameter('transactions', json_encode($transactions));

        $data = $this->save($request, 'Generado comprobante de ajuste');

        return array('success' => true, 'message' => 'app.msg.info.savedsuccessful', 'data' => $data);
    }

    public function executeReport(sfWebRequest $request) {
        $this->items = array();
        $this->totaldebit = 0;
        $this->totalcredit = 0;
        
        $this->user = Doctrine::getTable('sfGuardUser')->retrieveByUsername($this->getUser()->getUsername());

        $comprobant = Doctrine::getTable('Comprobant')->find($request->getParameter('id'));
        foreach ($comprobant->getTransactions() as $transaction) {
            $code = $transaction->getAccount()->getCode();
            $pieces = explode("->", $code);
            if (count($pieces) > 1) {
                unset($pieces[0]);
                $code = implode("", $pieces);
            }
            $this->items[] = array(
                "code" => $code,
                "name" => $transaction->getAccount()->getName(),
                "debit" => $transaction->getDebit(),
                "credit" => $transaction->getCredit(),
            );
            $this->totaldebit += $transaction->getDebit();
            $this->totalcredit += $transaction->getCredit();
        }
        $this->comment = $comprobant->getComment();
        $this->name = $comprobant->getName();
        $this->total = $this->totalcredit - $this->totaldebit;

        $this->letters = Util::getNumberSpell($this->total);

        $this->total = $this->total;
        $this->totaldebit = $this->totaldebit;
        $this->totalcredit = $this->totalcredit;


        $entity = Doctrine::getTable('Entity')->find($request->getParameter('entityid'));
        $this->entity = $entity->toArray();
    }

}
