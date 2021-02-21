<link media="screen,print" type="text/css" rel="stylesheet" href="../css/printReport.css">
<div id="body">
    <div id="content">
        <div class="page" style="font-size: 7pt">

            <table class="change_order_items">

                <tr>
                    <td colspan="12" style="text-align: center;border-bottom: 1px solid black;"><b>MAYOR</b></td>
                </tr>

                <tr>
                    <td colspan="3" rowspan="2"><?php echo $entity['name'] ?><br/><?php echo $entity['comment'] ?></td>
                    <td colspan="9" style="text-align: center;border-bottom: 1px solid black;"><b>CUENTA CONTROL</b></td>
                </tr>
                <tr>
                    <td colspan="5" style="text-align: justify;"><b>Nombre</b><br/><?php echo $account["name"] ?></td>
                    <td colspan="4" style="text-align: justify;"><b>C&oacute;digo</b><br/><?php echo $account["code"] ?></td>
                </tr>

                <tbody>
                    <tr>
                        <th style="text-align: center;"><b>D</b></th>
                        <th style="text-align: center;"><b>M</b></th>
                        <th style="text-align: center;"><b>REFERENCIA</b></th>
                        <th colspan="7" style="text-align: center;"><b>Detalle</b></th>
                        <th style="text-align: center;"><b>DEBE</b></th>
                        <th style="text-align: center;"><b>HABER</b></th>
                    </tr>

                    <?php
                    $evenrow = true;
                    $totaldebit = 0;
                    $totalcredit = 0;
                    ?>
                    <?php foreach ($items as $item): ?>
                        <tr class="<?php if ($evenrow) echo 'even_row'; if (!$evenrow) echo 'odd_row'; ?>"> 
                            <td style="text-align: center"><?php echo Util::convertToDate($item["comprobant"]->getCreationdate(), 'Y-m-d H:i:s', 'd') ?></td>
                            <td style="text-align: center"><?php echo Util::convertToDate($item["comprobant"]->getCreationdate(), 'Y-m-d H:i:s', 'm') ?></td>
                            <td style="text-align: center"><?php echo $item["comprobant"]->getName() ?></td>
                            <td colspan="7" style="text-align: justify"><?php echo $item["comprobant"]->getComment() ?></td>
                            <td style="text-align: right">$<?php echo Util::getNumberFormated($item["debit"], 2, '.', '') ?></td>
                            <td style="text-align: right">$<?php echo Util::getNumberFormated($item["credit"], 2, '.', '') ?></td>
                        </tr>
                        <?php
                        $evenrow = !$evenrow;
                        $totaldebit += $item["debit"];
                        $totalcredit += $item["credit"];
                        ?>
                    <?php endforeach ?>
                    <?php if (count($items) == 0): ?>
                        <tr class="odd_row"> 
                            <td colspan="12" style="text-align: justify">No existen elementos para mostrar.</td>
                        </tr>
                    <?php endif ?>
                    <tr class="<?php if ($evenrow) echo 'even_row'; if (!$evenrow) echo 'odd_row'; ?>"> 
                        <td colspan="10" style="text-align: right"><b>TOTAL:</b>&nbsp;&nbsp;&nbsp;</td>
                        <td style="text-align: right">$<?php echo Util::getNumberFormated($totaldebit, 2, '.', '') ?></td>
                        <td style="text-align: right">$<?php echo Util::getNumberFormated($totalcredit, 2, '.', '') ?></td>
                    </tr>

                </tbody>


                <tr class="even_row"> 
                    <td colspan="8" rowspan="2" style="text-align: center;"><b>Elaborado por</b></td>
                    <td colspan="3" style="text-align: center;"><b>Fecha</b></td>
                    <td rowspan="2" style="text-align: center;"><b>No.</b></td>
                </tr>

                <tr class="even_row"> 
                    <td style="text-align: center;"><b>D</b></td>
                    <td style="text-align: center;"><b>M</b></td>
                    <td style="text-align: center;"><b>A</b></td>
                </tr>

                <tr class="odd_row"> 
                    <td colspan="8" style="text-align: center; border-bottom: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td style="text-align: center; border-bottom: 1px solid black;"><?php echo date('d') ?></td>
                    <td style="text-align: center; border-bottom: 1px solid black;"><?php echo date('m') ?></td>
                    <td style="text-align: center; border-bottom: 1px solid black;"><?php echo date('Y') ?></td>
                    <td style="text-align: center; border-bottom: 1px solid black;"><?php echo $name ?></td>
                </tr>

            </table>

        </div>

    </div>
</div>