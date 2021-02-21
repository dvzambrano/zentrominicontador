<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage account
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class accountActions extends sfBaseActions {

    public function executeRequest(sfWebRequest $request) {
        $response = array();
        try {
            switch ($request->getParameter('method')) {
                case 'splitcostcenter':
                    $response = $this->splitaccount($request);
                    break;
                case 'splitelement':
                    $response = $this->splitaccount($request, true);
                    break;
                case 'movetoaccount':
                    $response = $this->movetoaccount($request);
                    break;
                case 'import':
                    /*
                      code: files[0][0],
                      name: files[0][1],
                      nature: files[0][2],
                      comment: files[0][3]
                     * 
                     * /NULL/
                     */

                    $request->setParameter('manualcode', 'on');
                    $request->setParameter('path', '/NULL');
                    if (stripos($request->getParameter('code'), '.') > -1) {
                        $pieces = explode('.', $request->getParameter('code'));
                        unset($pieces[count($pieces) - 1]);
                        $ak = implode('.', $pieces);
                        if ($request->getParameter('entityid') && $request->getParameter('entityid') != '')
                            $ak = str_replace('{0}', $request->getParameter('entityid'), Account::MULTIENTITY_PREFIX) . $ak;

                        $account = BaseTable::findByAK('Account', 'code', $ak);
                        if ($account && $account->getId() > -1) {
                            $request->setParameter('parentid', $account->getId());
                            $request->setParameter('path', $request->getParameter('path') . '/' . $account->getId());
                        }
                    }

                    $data = $this->save($request, false);
                    $response = array('success' => true, 'message' => 'app.msg.info.savedsuccessful', 'data' => $data);
                    break;
                case 'loadclosureconfig':
                    $data = Util::getMetadataValue('app_closureconfig');
                    $response = array('success' => true, 'message' => 'app.msg.info.savedsuccessful', 'data' => $data);
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

        if ($request->getParameter('query') && $request->getParameter('query') != '') {
            for ($index = 0; $index < count($filter); $index++)
                if ($filter[$index]->field == "name") {
                    $filter[$index]->field = array("name", "code");
                    break;
                }

//            $obj = new stdClass();
//            $obj->type = "string";
//            $obj->field = "name";
//            $obj->value = $request->getParameter('query');
//            $filter[] = $obj;
        }

        switch ($request->getParameter('component')) {
            case 'combo':
                $rows = AccountTable::getInstance()->getAll($filter);
                break;

            case 'tree':
//                 hago la validacion para cuando se esta buscando un padre escribiendo y no seleccionando
                if (!$request->getParameter('query') || $request->getParameter('query') == '') {
                    $obj = new stdClass();
                    $obj->type = "int";
                    $obj->field = "parentid";
                    if ($request->getParameter('node') == '' || $request->getParameter('node') == 'NULL')
                        $obj->comparison = "null";
                    else {
                        $obj->comparison = "eq";
                        $obj->value = $request->getParameter('node');
                    }
                    $filter[] = $obj;
                }
                $rows = AccountTable::getInstance()->getByParent($filter, $request->getParameter('checkeable'));
                break;

//            case 'tree':
//                $id = $request->getParameter('node');
//                $checkeable = $request->getParameter('checkeable');
//                $query = $request->getParameter('query');
//
//                $fromdate = false;
//                if ($request->getParameter('fromdate') && $request->getParameter('fromdate') != '')
//                    $fromdate = $request->getParameter('fromdate');
//
//                $todate = false;
//                if ($request->getParameter('todate') && $request->getParameter('todate') != '')
//                    $todate = $request->getParameter('todate');
//
//                $balancerecursive = $request->getParameter('balancerecursive') && $request->getParameter('balancerecursive') != '';
//
//                $rows = AccountTable::getInstance()->getByParent($id, $query, $checkeable, $fromdate, $todate, $balancerecursive);
//                if ($request->getParameter('customParam') != '')
//                    $rows = AccountTable::getInstance()->getByParent($id, $query, $checkeable);
//                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $account = array();
        $ak = Util::generateCode($request->getParameter('name') . $request->getParameter('parentid') . $request->getParameter('entityid'));
        if ($request->getParameter('manualcode') == 'on') {
            $ak = $request->getParameter('code');
            if ($request->getParameter('entityid') && $request->getParameter('entityid') != '')
                $ak = str_replace('{0}', $request->getParameter('entityid'), Account::MULTIENTITY_PREFIX) . $request->getParameter('code');
        }

        if ($request->getParameter('id') != '')
            $account = Doctrine::getTable('Account')->find($request->getParameter('id'));

        if ($account == array()) {
            $account = Doctrine::getTable('Account')->findByAK($ak);
            if ($account)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('account.field.label', 'account.field.name', $request->getParameter('name'))
                        )));
            $account = new Account();
        }
        else {
            $testobj = Doctrine::getTable('Account')->findByAK($ak);
            if ($testobj && ($request->getParameter('id') == '' || $testobj->getName() != $account->getName()))
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('account.field.label', 'account.field.name', $request->getParameter('name'))
                        )));
        }

        $account->setManualcode($request->getParameter('manualcode') == 'on');

        $account->setCode($ak);
        $account->setName($request->getParameter('name'));
        $account->setComment($request->getParameter('comment'));

        if ($request->getParameter('parentid') && $request->getParameter('parentid') != '')
            $account->setParentid($request->getParameter('parentid'));
        else
            $account->setParentid(null);

        if ($request->getParameter('entityid') && $request->getParameter('entityid') != '')
            $account->setEntityid($request->getParameter('entityid'));
        else
            $account->setEntityid(null);

        if ($request->getParameter('accountnature') == 'true')
            $account->setNature(true);
        else
            $account->setNature(false);


        $account->save();
        sfContext::getInstance()->getLogger()->alert('Salvada cuenta ' . $account->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');

        if ($request->getParameter('path') && $request->getParameter('path') != '') {
            $account->setPath($request->getParameter('path') . '/' . $account->getId());
            $account->save();
        }

        return $account->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Account')->deleteByPK($pks);
    }

    public function splitaccount(sfWebRequest $request, $elementable = false) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));

        foreach ($pks as $pk) {
            $parent = Doctrine::getTable('Account')->find($pk);

            $costcenters = CostcenterTable::getInstance()->getAll();
            $costcenters = $costcenters['data'];

            foreach ($costcenters as $costcenter) {
                $ak = Util::generateCode($costcenter['name'] . $parent->getId());
                if ($parent->getManualcode())
                    $ak = $parent->getCode() . '.' . $costcenter['id'];
                $account = Doctrine::getTable('Account')->findByAK($ak);
                if (!$account)
                    $account = new Account();

                $account->setManualcode($parent->getManualcode());

                $account->setCode($ak);
                $account->setName($costcenter['name']);
                $account->setComment($costcenter['comment']);

                $account->setNature($parent->getNature());
                $account->setAccount($parent);
                $account->setCostcenterid($costcenter['id']);

                $account->setEntityid($costcenter['entityid']);

                $account->save();
                $account->setPath($parent->getPath() . '/' . $account->getId());
                $account->save();

                if ($elementable) {
                    foreach ($costcenter['Elements'] as $element) {
                        $ak = Util::generateCode($element['name'] . $account->getId());
                        if ($account->getManualcode())
                            $ak = $account->getCode() . '.' . $element['id'];
                        $otheraccount = Doctrine::getTable('Account')->findByAK($ak);
                        if (!$otheraccount)
                            $otheraccount = new Account();

                        $otheraccount->setManualcode($account->getManualcode());

                        $otheraccount->setCode($ak);
                        $otheraccount->setName($element['name']);
                        $otheraccount->setComment($element['comment']);

                        $otheraccount->setNature($account->getNature());
                        $otheraccount->setAccount($account);
                        $otheraccount->setCostcenterid($costcenter['id']);
                        $otheraccount->setElementid($element['id']);

                        $otheraccount->setEntityid($costcenter['entityid']);

                        $otheraccount->save();
                        $otheraccount->setPath($account->getPath() . '/' . $otheraccount->getId());
                        $otheraccount->save();
                        sfContext::getInstance()->getLogger()->alert('Salvada apertura de cuenta ' . $otheraccount->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
                    }
                }
                else
                    sfContext::getInstance()->getLogger()->alert('Salvada apertura de cuenta ' . $account->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
            }
        }

        return array('success' => true, 'message' => 'app.msg.info.savedsuccessful');
    }

    public function movetoaccount(sfWebRequest $request) {
        $account = Doctrine::getTable('Account')->find($request->getParameter('fromaccount'));
        $nodes = Util::getArrayOrdered($account, array(), 'postorder', 'getAccounts');

        $ids = array();
        foreach ($nodes as $value) {
            switch ($request->getParameter('condition')) {
                case 'balanceplus':
                    $account = Doctrine::getTable('Account')->find($value['id']);
                    $balance = $account->getBalance($request->getParameter('fromdate'), $request->getParameter('todate'), true);
                    if ($balance > 0)
                        array_push($ids, $value['id']);
                    break;
                case 'balanceminus':
                    $account = Doctrine::getTable('Account')->find($value['id']);
                    $balance = $account->getBalance($request->getParameter('fromdate'), $request->getParameter('todate'), true);
                    if ($balance < 0)
                        array_push($ids, $value['id']);
                    break;
                default:
                    array_push($ids, $value['id']);
                    break;
            }
        }

        $array = array();
        if (count($ids) > 0)
            $transactions = TransactionTable::getAllByIds($ids, $request->getParameter('fromdate'), $request->getParameter('todate'));


        $nonclosedcomprobants = array();
        foreach ($transactions as $transaction)
            if (!$transaction->getComprobant()->getIsModificable()) {
                $obj = json_decode(json_encode($transaction->toArray()));
                $temp = $obj->debit;
                $obj->debit = $obj->credit;
                $obj->credit = $temp;

                array_push($array, $obj);

                $obj = json_decode(json_encode($transaction->toArray()));
                $obj->accountid = $request->getParameter('toaccount');

                array_push($array, $obj);
            }
            else
                array_push($nonclosedcomprobants, $transaction->getComprobant()->toArray());

        if (count($nonclosedcomprobants) > 0)
            return array('success' => true, 'message' => 'account.action.closure.error.nonmodificablecomprobant', 'data' => $nonclosedcomprobants);

        return array('success' => true, 'message' => 'app.msg.info.savedsuccessful', 'data' => json_encode($array));
    }

    public function executeMayor(sfWebRequest $request) {
        $account = Doctrine::getTable('Account')->find($request->getParameter('id'));
        $this->account = $account->toArray();

        $ids = array();
        $nodes = Util::getArrayOrdered($account, array(), 'preorder', 'getAccounts');
        $this->accounts = array();
        foreach ($nodes as $value) {
            $ids[] = $value['id'];

            $pieces = explode("->", $value['code']);
            if (count($pieces) > 1) {
                unset($pieces[0]);
                $value['code'] = implode("", $pieces);
            }
            $this->accounts[] = $value;
        }


        $pieces = explode("->", $this->account["code"]);
        if (count($pieces) > 1) {
            unset($pieces[0]);
            $this->account["code"] = implode("", $pieces);
        }

        $array = array();

        $fromdate = $request->getParameter('fromdate');
        if ($fromdate && $fromdate != '')
            $fromdate.=' 00:00:00';

        $todate = $request->getParameter('todate');
        if ($todate && $todate != '')
            $todate.=' 23:59:59';

        $transactions = TransactionTable::getAllByIds($ids, $fromdate, $todate);
        foreach ($transactions as $transaction) {
            if (!isset($array[$transaction->getComprobantid()]))
                $array[$transaction->getComprobantid()] = array(
                    "comprobant" => $transaction->getComprobant(),
                    "transactions" => array(),
                    "debit" => 0,
                    "credit" => 0
                );

            $array[$transaction->getComprobantid()]["transactions"][] = $transaction;
            $array[$transaction->getComprobantid()]["debit"] += $transaction->getDebit();
            $array[$transaction->getComprobantid()]["credit"] += $transaction->getCredit();
        }
        $this->items = $array;

        $entity = Doctrine::getTable('Entity')->find($request->getParameter('entityid'));
        $this->entity = $entity->toArray();

        if ($request->getParameter('view') == "submayor")
            $this->setTemplate('submayor');
    }

    public function executeBalance(sfWebRequest $request) {
        $ids = array();
        $accounts = array();
        $this->accounts = array();
        $this->subtitle = '';
        if ($request->getParameter('fromdate') && $request->getParameter('fromdate') != '')
            $this->subtitle .= 'De: ' . Util::convertToDate($request->getParameter('fromdate'), 'Y-m-d H:i:s', 'd/m/Y');
        if ($request->getParameter('todate') && $request->getParameter('todate') != '')
            $this->subtitle .= ' Hasta: ' . Util::convertToDate($request->getParameter('todate'), 'Y-m-d H:i:s', 'd/m/Y');


        if ($request->getParameter('id') && $request->getParameter('id') != '')
            $accounts = array(Doctrine::getTable('Account')->find($request->getParameter('id')));
        else {
            $q = Doctrine_Query::create()
                    ->select('t.*')
                    ->from('Account t')
                    ->where('t.parentid IS NULL')
                    ->andWhere('t.entityid = ?', $request->getParameter('entityid'));
            $accounts = $q->execute();
        }

        foreach ($accounts as $account) {
            $nodes = Util::getArrayOrdered($account, array(), 'preorder', 'getAccounts');
            foreach ($nodes as $value) {
                $ids[] = $value['id'];

                $pieces = explode("->", $value['code']);
                if (count($pieces) > 1) {
                    unset($pieces[0]);
                    $value['code'] = implode("", $pieces);
                }

                $account = Doctrine::getTable('Account')->find($value['id']);
                $value['balance'] = $account->getBalance($request->getParameter('fromdate'), $request->getParameter('todate'), true);
                $value['leaf'] = count($account->getAccounts());

                if ($value['balance']['balance'] > 0 || $value['balance']['balance'] < 0)
                    $this->accounts[] = $value;
            }
        }

        $entity = Doctrine::getTable('Entity')->find($request->getParameter('entityid'));
        $this->entity = $entity->toArray();
    }

}
