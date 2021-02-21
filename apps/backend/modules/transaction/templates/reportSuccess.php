<html>
    <head>
        <style>
            @page {
              size: auto;
              odd-header-name: html_MyHeader1;
              odd-footer-name: html_MyFooter1;
            }

            @page chapter2 {
                odd-header-name: html_MyHeader2;
                odd-footer-name: html_MyFooter2;
            }

            @page noheader {
                odd-header-name: _blank;
                odd-footer-name: _blank;
            }

            div.chapter2 {
                page-break-before: always;
                page: chapter2;
            }

            div.noheader {
                page-break-before: always;
                page: noheader;
            }
            table.change_order_items { 
                /*font-size: 8pt;*/
                width: 100%;
                border-collapse: collapse;
                margin-top: 2em;
                margin-bottom: 2em;
            }

            table.change_order_items>tbody { 
                border: 1px solid black;
            }

            table.change_order_items>tbody>tr>th { 
                border-bottom: 1px solid black;
            }

            table.change_order_items>tbody>tr>td { 
                border-right: 1px solid black;
                padding: 0.5em;
            }
            table.change_order_items>thead { 
                border: 1px solid black;
            }

            table.change_order_items>thead>tr>th { 
                border-bottom: 1px solid black;
            }

            table.change_order_items>thead>tr>td { 
                border-right: 1px solid black;
                padding: 0.5em;
            }


            td.change_order_total_col { 
                padding-right: 4pt;
                text-align: right;
            }

            td.change_order_unit_col { 
                padding-left: 2pt;
                text-align: left;
            }

            .even_row td {
                /*  background-color: #F8EEE4;
                  border-top: 3px solid #FFFFff;*/
                background-color: #f6f6f6;
                border-bottom: 0.9px solid #ddd;
            }

            .written_field { 
                border-bottom: 0.1pt solid black;
            }

        </style>
    </head>
    <body>
        <htmlpageheader name="MyHeader1">
            <div style="text-align: right; <!--border-bottom: 1px solid #000000;--> font-weight: bold; font-size: 10pt;"></div>
        </htmlpageheader>

        <table style="width: 100%;" class="header">
            <tr>
                <td><h1 style="text-align: left">BALANCE DE COMPROBACI&Oacute;N</h1></td>
                <td>
                    <h3 style="text-align: right">
                        <?php if ($fromdate && $fromdate != ''): ?>
                            DESDE <?php echo $fromdate ?> 
                        <?php endif ?>
                        <?php if ($todate && $todate != ''): ?>
                            HASTA <?php echo $todate ?> 
                        <?php endif ?>
                    </h3>
                </td>
            </tr>
        </table>

        <table class="change_order_items">

            <tr><td colspan="4"><h2>Por negocio:</h2></td></tr>

            <tbody>
                <tr>
                    <th>No.</th>
                    <th>Negocio</th>
                    <th colspan="2">Total</th>
                </tr>

                <?php $evenrow = false; ?>
                <?php foreach ($costcenters as $costcenter): ?>
                    <?php if (!$evenrow): ?>
                        <tr class="even_row">
                            <td style="text-align: center"><?php echo $costcenter['index'] ?></td>
                            <td><?php echo $costcenter['name'] ?></td>
                            <td style="text-align: right; border-right-style: none;">$<?php echo $costcenter['subtotal'] ?></td>
                            <td class="change_order_unit_col" style="border-left-style: none;"><?php echo $currencycode ?></td>
                        </tr>
                    <?php endif ?>

                    <?php if ($evenrow): ?>
                        <tr class="odd_row"> <td style="text-align: center"><?php echo $costcenter['index'] ?></td>
                            <td><?php echo $costcenter['name'] ?></td>
                            <td style="text-align: right; border-right-style: none;">$<?php echo $costcenter['subtotal'] ?></td>
                            <td class="change_order_unit_col" style="border-left-style: none;"><?php echo $currencycode ?></td>
                        </tr>
                    <?php endif ?>

                    <?php $evenrow = !$evenrow; ?>
                <?php endforeach ?>

            </tbody>

            <tr>
                <td colspan="2" style="text-align: right;"><b>BALANCE TOTAL POR NEGOCIO:</b></td>
                <td style="text-align: right; border-right-style: none;">$<b><?php echo $costcentertotal ?></b></td>
                <td class="change_order_unit_col" style="border-left-style: none;"><?php echo $currencycode ?></td>
            </tr>
        </table>

        <!-- ---------------------------------------------------------------------------- -->

        <table class="change_order_items">

            <tr><td colspan="4"><h2>Por elementos:</h2></td></tr>

            <tbody>
                <tr>
                    <th>No.</th>
                    <th>Elemento</th>
                    <th colspan="2">Total</th>
                </tr>

                <?php $evenrow = false; ?>
                <?php foreach ($elements as $element): ?>
                    <?php if (!$evenrow): ?>
                        <tr class="even_row">
                            <td style="text-align: center"><?php echo $element['index'] ?></td>
                            <td><?php echo $element['name'] ?></td>
                            <td style="text-align: right; border-right-style: none;">$<?php echo $element['subtotal'] ?></td>
                            <td class="change_order_unit_col" style="border-left-style: none;"><?php echo $currencycode ?></td>
                        </tr>
                    <?php endif ?>

                    <?php if ($evenrow): ?>
                        <tr class="odd_row"> <td style="text-align: center"><?php echo $element['index'] ?></td>
                            <td><?php echo $element['name'] ?></td>
                            <td style="text-align: right; border-right-style: none;">$<?php echo $element['subtotal'] ?></td>
                            <td class="change_order_unit_col" style="border-left-style: none;"><?php echo $currencycode ?></td>
                        </tr>
                    <?php endif ?>

                    <?php $evenrow = !$evenrow; ?>
                <?php endforeach ?>

            </tbody>

            <tr>
                <td colspan="2" style="text-align: right;"><b>BALANCE TOTAL POR ELEMENTOS:</b></td>
                <td style="text-align: right; border-right-style: none;">$<b><?php echo $elementtotal ?></b></td>
                <td class="change_order_unit_col" style="border-left-style: none;"><?php echo $currencycode ?></td>
            </tr>
        </table>

        <htmlpagefooter name="MyFooter1">
            <table width="100%" style="vertical-align: bottom;">
                <tr>
                    <td width="90%" style="font-size: 8px;"><?php echo Util::getBundle('app.languaje.report.author', 'es-ES', array($user->getFirstName().' '.$user->getLastName(), Util::getMetadataValue('app_name'))) ?></td>
                    <td width="10%" style="text-align: right; visibility:hidden;">{PAGENO}/{nbpg}</td>
                </tr>
            </table>
        </htmlpagefooter>
    </body>
</html>