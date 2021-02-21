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

        <table class="change_order_items">

            <tr>
                <td colspan="3"><?php echo $entity['name'] ?><br/><?php echo $entity['comment'] ?></td>
                <td colspan="9" style="text-align: center;"><b>COMPROBANTE DE OPERACIONES</b></td>
            </tr>

            <tbody>
                <tr>
                    <th colspan="3" style="text-align: center;"><b>C&Oacute;DIGO / Folio</b></th>
                    <th colspan="7" style="text-align: center;"><b>CONCEPTO</b></th>
                    <th style="text-align: center;"><b>DEBE</b></th>
                    <th style="text-align: center;"><b>HABER</b></th>
                </tr>

                <?php $evenrow = true; ?>
                <?php foreach ($items as $item): ?>
                    <tr class="<?php if ($evenrow) echo 'even_row'; if (!$evenrow) echo 'odd_row'; ?>"> 
                        <td colspan="3" style="text-align: justify"><?php echo $item["code"] ?></td>
                        <td colspan="7"  style="text-align: justify"><?php echo $item["name"] ?></td>
                        <td style="text-align: right">$<?php echo Util::getNumberFormated($item["debit"], 2, ".", "") ?></td>
                        <td style="text-align: right">$<?php echo Util::getNumberFormated($item["credit"], 2, ".", "") ?></td>
                    </tr>
                    <?php $evenrow = !$evenrow; ?>
                <?php endforeach ?>

                <tr class="<?php if ($evenrow) echo 'even_row'; if (!$evenrow) echo 'odd_row'; ?>"> 
                    <td colspan="10" style="text-align: right;"><b>TOTALES</b></td>
                    <td style="text-align: right;">$<?php echo Util::getNumberFormated($totaldebit, 2, ".", "") ?></td>
                    <td style="text-align: right;">$<?php echo Util::getNumberFormated($totalcredit, 2, ".", "") ?></td>
                </tr>
                <tr>
                    <td colspan="12"><?php echo $comment ?><br/><br/></td>
                </tr>

            </tbody>


            <tr class="even_row"> 
                <td rowspan="2" style="text-align: center;"><b>HECHO</b></td>
                <td rowspan="2" style="text-align: center;"><b>REVISADO</b></td>
                <td rowspan="2" style="text-align: center;"><b>APROBADO</b></td>
                <td colspan="4" style="text-align: center;"><b>ANOTADO EN</b></td>
                <td colspan="3" style="text-align: center;"><b>Fecha</b></td>
                <td rowspan="2" style="text-align: center;"><b>Comprobante No.</b></td>
                <td rowspan="2" style="text-align: center;"><b>Hoja No.</b></td>
            </tr>

            <tr class="even_row"> 
                <td style="text-align: center;"><b>Registro</b></td>
                <td style="text-align: center;"><b>Submayor</b></td>
                <td style="text-align: center;"><b>Mayor</b></td>
                <td style="text-align: center;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td style="text-align: center;"><b>D</b></td>
                <td style="text-align: center;"><b>M</b></td>
                <td style="text-align: center;"><b>A</b></td>
            </tr>

            <tr class="odd_row"> 
                <td style="text-align: center; border-bottom: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td style="text-align: center; border-bottom: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td style="text-align: center; border-bottom: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td style="text-align: center; border-bottom: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td style="text-align: center; border-bottom: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td style="text-align: center; border-bottom: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td style="text-align: center; border-bottom: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td style="text-align: center; border-bottom: 1px solid black;"><?php echo date('d') ?></td>
                <td style="text-align: center; border-bottom: 1px solid black;"><?php echo date('m') ?></td>
                <td style="text-align: center; border-bottom: 1px solid black;"><?php echo date('Y') ?></td>
                <td style="text-align: center; border-bottom: 1px solid black;"><?php echo $name ?></td>
                <td style="text-align: center; border-bottom: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
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