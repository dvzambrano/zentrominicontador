<link media="screen,print" type="text/css" rel="stylesheet" href="../css/printReport.css">
<div id="body">
    <div id="content">
        <div class="page" style="font-size: 7pt">

            <table class="change_order_items">
                <tr>
                    <td colspan="3" style="border-bottom: 1px solid black;"><?php echo $entity['name'] ?><br/><?php echo $entity['comment'] ?></td>
                    <td colspan="9" style="text-align: center;border-bottom: 1px solid black;"><b>ESTADO FINANCIERO</b><br><?php echo $subtitle ?></td>
                </tr>

                <tbody>
                    <tr>
                        <th colspan="9" style="text-align: center;"><b>CUENTA</b></th>
                        <th style="text-align: center;"><b>DEBE</b></th>
                        <th style="text-align: center;"><b>HABER</b></th>
                        <th style="text-align: center;"><b>BALANCE</b></th>
                    </tr>

                    <?php
                    $evenrow = true;
                    $totaldebit = 0;
                    $totalcredit = 0;
                    $totalbalance = 0;
                    ?>
                    <?php foreach ($accounts as $item): ?>
                        <tr class="<?php if ($evenrow) echo 'even_row'; if (!$evenrow) echo 'odd_row'; ?>"> 
                            <td colspan="9" style="text-align: justify">
                                <?php
                                $pieces = explode('.', $item["code"]);
                                foreach ($pieces as $piece):
                                    ?>
                                    &nbsp;
                                <?php endforeach ?>
                                <?php echo '<b>' . $item["code"] . '</b> ' . $item["name"] ?>
                            </td>
                            <td style="text-align: right">$<?php echo Util::getNumberFormated($item["balance"]["debit"], 2, '.', '') ?></td>
                            <td style="text-align: right">$<?php echo Util::getNumberFormated($item["balance"]["credit"], 2, '.', '') ?></td>
                            <td style="text-align: right">$<?php echo Util::getNumberFormated($item["balance"]["balance"], 2, '.', '') ?></td>
                        </tr>
                        <?php
                        $evenrow = !$evenrow;
                        if ($item["leaf"] == 0) {
                            $totaldebit += $item["balance"]["debit"];
                            $totalcredit += $item["balance"]["credit"];
                            $totalbalance += $item["balance"]["balance"];
                        }
                        ?>
                    <?php endforeach ?>
                    <?php if (count($accounts) == 0): ?>
                        <tr class="odd_row"> 
                            <td colspan="12" style="text-align: justify">No existen elementos para mostrar.</td>
                        </tr>
                    <?php endif ?>
                    <tr class="<?php if ($evenrow) echo 'even_row'; if (!$evenrow) echo 'odd_row'; ?>"> 
                        <td colspan="9" style="text-align: right"><b>TOTAL:</b>&nbsp;&nbsp;&nbsp;</td>
                        <td style="text-align: right">$<?php echo Util::getNumberFormated($totaldebit, 2, '.', '') ?></td>
                        <td style="text-align: right">$<?php echo Util::getNumberFormated($totalcredit, 2, '.', '') ?></td>
                        <td style="text-align: right">$<?php echo Util::getNumberFormated($totalbalance, 2, '.', '') ?></td>
                    </tr>

                </tbody>


                <tr class="even_row"> 
                    <td colspan="9"><b>Elaborado por</b></td>
                    <td style="text-align: center;"><b>D</b></td>
                    <td style="text-align: center;"><b>M</b></td>
                    <td style="text-align: center;"><b>A</b></td>
                </tr>

                <tr class="odd_row"> 
                    <td colspan="9" style="text-align: center; border-bottom: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td style="text-align: center; border-bottom: 1px solid black;"><?php echo date('d') ?></td>
                    <td style="text-align: center; border-bottom: 1px solid black;"><?php echo date('m') ?></td>
                    <td style="text-align: center; border-bottom: 1px solid black;"><?php echo date('Y') ?></td>
                </tr>

            </table>

        </div>

    </div>
</div>