(function ($) {
    var activity_options_default_value = '';
    Drupal.behaviors.asa23 = {
        attach: function (context, settings) {
            if (!Drupal.settings.mywebform.preview) {
                activity_options_default_value = (typeof Drupal.settings.mywebform.values.CAEM != "undefined" ? Drupal.settings.mywebform.values.CAEM : '');
            }

            jQuery('#mywebform-edit-form').on('keypress', 'input.money, input.float, input.numeric', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });

            check_is_checked();
            jQuery('input[type=checkbox]').change(function () {
                var state = jQuery(this).is(':checked');
                var group = jQuery(this).attr('name');
                var pos = group.indexOf('CHESTIONAR_RA_');
                var res = group.substr(0, pos !== false ? pos : 0);

                if (jQuery(this).attr('name') == "CHESTIONAR_RA_C1") {
                    jQuery('#CHESTIONAR_RA_C2').attr("checked", false);
                }
                else if (jQuery(this).attr('name') == "CHESTIONAR_RA_C2") {
                    jQuery('#CHESTIONAR_RA_C1').attr("checked", false);
                }

                if (jQuery(this).attr('name') == "CHESTIONAR_R1_C1") {
                    jQuery('#CHESTIONAR_R2_C1').attr("checked", false);
                    jQuery('#CHESTIONAR_R3_C1').attr("checked", false);
                }
                else if (jQuery(this).attr('name') == "CHESTIONAR_R2_C1") {
                    jQuery('#CHESTIONAR_R1_C1').attr("checked", false);
                    jQuery('#CHESTIONAR_R3_C1').attr("checked", false);
                }
                else if (jQuery(this).attr('name') == "CHESTIONAR_R3_C1") {
                    jQuery('#CHESTIONAR_R1_C1').attr("checked", false);
                    jQuery('#CHESTIONAR_R2_C1').attr("checked", false);
                }

                check_is_checked();

            });
        }
    };

    function check_is_checked() {
        var select_yes = jQuery('#CHESTIONAR_RA_C1');
        var select_no = jQuery('#CHESTIONAR_RA_C2');
        if (select_yes.is(':checked')) {
            jQuery('#CHESTIONAR_RI_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RII_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RIII_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RIV_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RV_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RVI_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RVII_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RVIII_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RIX_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RX_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RXI_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_RXII_C1').attr("disabled", false);

            jQuery('#CHESTIONAR_R1_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_R1_C1').attr("checked", false);
            jQuery('#CHESTIONAR_R2_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_R2_C1').attr("checked", false);
            jQuery('#CHESTIONAR_R3_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_R3_C1').attr("checked", false);
            select_no.attr("checked", false);
        } else {

            jQuery('#CHESTIONAR_R1_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_R2_C1').attr("disabled", false);
            jQuery('#CHESTIONAR_R3_C1').attr("disabled", false);

            jQuery('#CHESTIONAR_RI_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RI_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RII_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RII_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RIII_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RIII_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RIV_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RIV_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RV_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RV_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RVI_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RVI_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RVII_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RVII_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RVIII_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RVIII_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RIX_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RIX_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RX_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RX_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RXI_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RXI_C1').attr("checked", false);
            jQuery('#CHESTIONAR_RXII_C1').attr("disabled", true);
            jQuery('#CHESTIONAR_RXII_C1').attr("checked", false);
            select_yes.attr("checked", false);
        }
    }
})(jQuery);

webform.afterLoad.asa23 = function () {
    if (!Drupal.settings.mywebform.preview) {
        var villages = jQuery("select[field='CAP5_R_C36']").myWebformSelect2GetOptions();
        villages.forEach(function (village, index) {
            if (village.id == '0000000') {
                villages.splice(index, 1);
                return;
            }
        });


        var arrayCaem = ['CAP4_R_C32', 'CAP5_R_C37'];

        jQuery.each(arrayCaem, function (key, value) {
            set_caem_to_select(value, null, null);
            set_options_html(value);
        });
    }
};

function set_options_html(selector) {
    var caemValues = Drupal.settings.mywebform.values[selector];
    if (!jQuery.isEmptyObject(caemValues)) {
        jQuery.each(caemValues, function (key, value) {
            set_caem_to_select(selector, value, key + 1);
        });
    }
}

function set_caem_to_select(selector, valueCaem, keyCaem) {
    var obj = (keyCaem !== null ? jQuery('#' + selector + '-' + keyCaem) : jQuery('#' + selector));
    obj.empty();
    obj.append(jQuery("<option></option>").attr("value", '').text(''));
    jQuery.each(caem_select, function (key, value) {
        if (value.description == valueCaem)
            obj.append(
                jQuery("<option></option>").attr("value", value.description).attr("selected", "selected").text(value.description + " , " + value.name));
        else
            obj.append(
                jQuery("<option></option>").attr("value", value.description).text(value.description + " , " + value.name));
    });

    obj.change();
}

webform.validators.asa23 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values,
        cfoj = values.TITLU_R1_C31,
        cfojNr = cfoj.substring(0, 3),
        cfp = values.TITLU_R5_C31,
        cfpNr = cfp.substring(0, 2);

    var cap1_r100 = new Decimal(values.CAP1_R100_C1 || 0),
        cap1_r110 = new Decimal(values.CAP1_R110_C1 || 0),
        cap1_r120 = new Decimal(values.CAP1_R120_C1 || 0),
        cap1_r130 = new Decimal(values.CAP1_R130_C1 || 0),
        cap1_r140 = new Decimal(values.CAP1_R140_C1 || 0),
        cap1_r150 = new Decimal(values.CAP1_R150_C1 || 0);

    if (values.CHESTIONAR_RA_C1 != true && values.CHESTIONAR_RA_C2 != true) {
        webform.errors.push({
            'fieldName': 'CHESTIONAR_RA_C1',
            'msg': Drupal.t('Cod eroare: 0.00, Trebuie sa bifati da sau nu in Cap.A')
        });
    }

    if (values.CHESTIONAR_RA_C2 == true && (values.CHESTIONAR_R1_C1 != true && values.CHESTIONAR_R2_C1 != true && values.CHESTIONAR_R3_C1 != true)) {
        webform.errors.push({
            'fieldName': 'CHESTIONAR_RA_C2',
            'msg': Drupal.t('Cod eroare: 0.01, Trebuie sa bifati una din optiunule variantei nu')
        });
    }

    if (values.CHESTIONAR_RA_C1 == true && (values.CHESTIONAR_RI_C1 != true && values.CHESTIONAR_RII_C1 != true && values.CHESTIONAR_RIII_C1 != true && values.CHESTIONAR_RIV_C1 != true &&
        values.CHESTIONAR_RV_C1 != true && values.CHESTIONAR_RVI_C1 != true && values.CHESTIONAR_RVII_C1 != true && values.CHESTIONAR_RVIII_C1 != true &&
        values.CHESTIONAR_RIX_C1 != true && values.CHESTIONAR_RX_C1 != true && values.CHESTIONAR_RXI_C1 != true && values.CHESTIONAR_RXII_C1 != true)) {
        webform.errors.push({
            'fieldName': 'CHESTIONAR_RA_C1',
            'msg': Drupal.t('Cod eroare: 0.02, Trebuie sa bifati una din optiunule variantei da')
        });
    }

 



    if (cfpNr == '12' && !(cfojNr == '500' || cfojNr == '510' || cfojNr == '520' || cfojNr == '530' || cfojNr == '590' || cfojNr == '690' || cfojNr == '880' || cfojNr == '960')) {
        webform.errors.push({
            'fieldName': 'TITLU_R1_C31',
            'msg': Drupal.t('Cod eroare: A.01, Daca CFP = 12, atunci CFOJ = 500, 510, 520, 530, 590, 690, 880, 960')
        });
    }

    if (cfpNr == '13' && !(cfojNr == '500' || cfojNr == '510' || cfojNr == '520' || cfojNr == '530' || cfojNr == '620' || cfojNr == '690' || cfojNr == '880' || cfojNr == '960')) {
        webform.errors.push({
            'fieldName': 'TITLU_R1_C31',
            'msg': Drupal.t('Cod eroare: A.02, Daca CFP = 13. atunci CFOJ = 500, 510, 520, 530, 620, 690, 880, 960')
        });
    }

    if ((cfpNr == '15' || cfpNr == '16' || cfpNr == '18') &&
        !(cfojNr == '420' || cfojNr == '430' || cfojNr == '440' || cfojNr == '450' || cfojNr == '500' || cfojNr == '510' || cfojNr == '520' || cfojNr == '530' || cfojNr == '540' ||
            cfojNr == '541' || cfojNr == '550' || cfojNr == '560' || cfojNr == '690' || cfojNr == '700' || cfojNr == '871' || cfojNr == '890' || cfojNr == '899' || cfojNr == '900' ||
            cfojNr == '910' || cfojNr == '930' || cfojNr == '940' || cfojNr == '950' || cfojNr == '960' || cfojNr == '970' || cfojNr == '980' || cfojNr == '990' || cfojNr == '992' ||
            cfojNr == '993' || cfojNr == '994' || cfojNr == '995' || cfojNr == '998')) {
        webform.errors.push({
            'fieldName': 'TITLU_R1_C31',
            'msg': Drupal.t('Cod eroare: A.03, Daca CFP = 15, 16, 18, atunci CFOJ = 420, 430, 440, 450, 500, 510, 520, 530, 540, 541, 550, 560, 690, 700, 871, 890, 899, 900, 910, 930, 940, 950, 960, 970, 980, 990, 992, 993, 994, 995, 998')
        });
    }

    if (cfpNr == '20' && !(cfojNr == '500' || cfojNr == '510' || cfojNr == '520' || cfojNr == '530' || cfojNr == '690')) {
        webform.errors.push({
            'fieldName': 'TITLU_R1_C31',
            'msg': Drupal.t('Cod eroare: A.04, Daca CFP = 20, atunci CFOJ = 500, 510, 520, 530, 690')
        });
    }

    if (
        cfpNr == '28' && !(cfojNr == '430' || cfojNr == '440' || cfojNr == '500' || cfojNr == '510' || cfojNr == '520' || cfojNr == '530' || cfojNr == '540' || cfojNr == '550' ||
            cfojNr == '560' || cfojNr == '690' || cfojNr == '920' || cfojNr == '950' || cfojNr == '960')) {
        webform.errors.push({
            'fieldName': 'TITLU_R1_C31',
            'msg': Drupal.t('Cod eroare: A.05, Daca CFP = 28, atunci CFOJ = 430, 440, 500, 510, 520, 530, 540, 550, 560, 690, 920, 950, 960')
        });
    }

    if ((cfpNr == '23' || cfpNr == '24' || cfpNr == '25' || cfpNr == '26') && !(cfojNr == '500' || cfojNr == '510' || cfojNr == '520' || cfojNr == '530' || cfojNr == '540' ||
        cfojNr == '550' || cfojNr == '560' || cfojNr == '690' || cfojNr == '871' || cfojNr == '890' || cfojNr == '899' || cfojNr == '910' || cfojNr == '920' || cfojNr == '940' ||
        cfojNr == '950' || cfojNr == '960' || cfojNr == '996' || cfojNr == '997')) {
        webform.errors.push({
            'fieldName': 'TITLU_R1_C31',
            'msg': Drupal.t('Cod eroare: A.06, Daca CFP = 23, 24, 25, 26, atunci CFOJ = 500, 510, 520, 530, 540, 550, 560, 690, 871, 890, 899, 910, 920, 940, 950, 960, 996, 997')
        });
    }

    //Start
    var caem = 0,
        caemNr4 = 0,
        caemNr3 = 0,
        caemNr2 = 0,
        thirdCol;
    var caem6Nr4Arr = [3514, 3523, 3530],
        caem6Nr3Arr = [451, 453, 454, 462, 463, 464, 465, 466, 467, 468, 469],
        caem6Nr2Arr = [47, 56];

    for (i = 0; i < values.CAP4_R_C31.length; i++) {

        var codeMatch = false;
        caem = values.CAP4_R_C31[i];
        thirdCol = Number(values.CAP4_R_C3[i]);
        caemNr4 = Number(caem.substring(0, 4));
        caemNr3 = Number(caem.substring(0, 3));
        caemNr2 = Number(caem.substring(0, 2));

        if (caemNr4 === 0) {
            webform.errors.push({
                'fieldName': 'CAP4_R_C31',
                'index': i,
                'msg': Drupal.t('Cod eroare: 4.07, In cap.4 in coloana B [CAEM rev.2] necesita obligatoriu o valoare')
            });
        }

        for (j = 0; j < caem6Nr4Arr.length; j++) {
            if (caemNr4 === caem6Nr4Arr[j]) {
                codeMatch = true;
            }
        }

        for (var k = 0; k < caem6Nr3Arr.length; k++) {
            if (caemNr3 === caem6Nr3Arr[k]) {
                codeMatch = true;
            }
        }

        for (var l = 0; l < caem6Nr2Arr.length; l++) {
            if (caemNr2 === caem6Nr2Arr[l]) {
                codeMatch = true;
            }
        }

        if (codeMatch === true && thirdCol == 0) {
            webform.warnings.push({
                'fieldName': 'CAP4_R_C3',
                'index': i,
                'msg': Drupal.t('Cod eroare: 4.08, In cap.4 col.3 se completeaza pentru CAEM-2: 3514, 3523, 3530, 451, 453, 454, 462-469, 47, 56')
            });
        }
    }

    //End 






    var caem805 = 0;
    var caem805Nr4 = 0;

    for (var m = 0; m < values.CAP5_R_C37.length; m++) {
        caem805 = values.CAP5_R_C37[m];
        caem805Nr4 = Number(caem805.substring(0, 4));

        if (caem805Nr4 == '') {
            webform.errors.push({
                'fieldName': '3662',
                'index': m,
                'msg': Drupal.t('Cod eroare: 5.05, In cap.5 coloana F CAEM-2 necesita obligatoriu o valoare')
            });
        }
    }

    var caem6 = 0;
    var caem8 = 0;
    var matchFound = false;

    for (var i = 0; i < values.CAP4_R_C3.length; i++) {
        for (var j = 0; j < values.CAP5_R_C37.length; j++) {
            caem6 = values.CAP4_R_C31[i];
            caem8 = values.CAP5_R_C37[j];

            if (caem6 == caem8) {
                matchFound = true;
            }
        }
    }

    if (matchFound == false) {
        webform.errors.push({
            'fieldName': 'CAP4_R_C31',
            'msg': Drupal.t('Cod eroare: 5.09, In cap.5 in coloana F [CAEM rev.2] trebuie sa se reflecte cel putin un cod de activitate reflectat in cap.4 coloana B [CAEM rev.2]')
        });
    }



    // var sumR291 = Decimal(values.CAP2_R2911_C1 || 0).plus(values.CAP2_R2912_C1 || 0);
    // if (Decimal(values.CAP2_R291_C1 || 0).lessThan(sumR291)) {
    //     webform.errors.push({
    //         'fieldName': 'CAP2_R291_C1',
    //         'msg': Drupal.t('Cod eroare: 64-006, [r.291 c.1] >= [r.2911c.1] + [r.2912 c.1]')
    //     });
    // }



    // var sumR310 = Decimal(values.CAP2_R311_C1 || 0).plus(values.CAP2_R312_C1 || 0);
    // if (!(Decimal(values.CAP2_R310_C1 || 0) >= sumR310)) {
    //     webform.errors.push({
    //         'fieldName': 'CAP2_R310_C1',
    //         'msg': Drupal.t('Cod eroare: 64-037, Cap.2 [r.310 c.1] >= [r.311 c.1]+ [r.312 c.1]')
    //     });
    // }
//Start 64-037
    var sumR311_312 = Decimal(values.CAP2_R311_C1 || 0).plus(values.CAP2_R312_C1 || 0);
    var sumR310_037 = Decimal(values.CAP2_R310_C1 || 0);

    // Round the values to one sign after zero
    sumR311_312 = sumR311_312.toDecimalPlaces(1);
    sumR310_037 = sumR310_037.toDecimalPlaces(1);



    if (sumR310_037.lessThan(sumR311_312)) {
        var errorMsg = Drupal.t('Cod eroare: 64-037, Cap.2 [r.310 c.1] >= [r.311 c.1] + [r.312 c.1] - [r.310 c.1] < [r.311 c.1] + [r.312 c.1] = [sumR311_312] ', {
            '[sumR311_312]': sumR311_312.toFixed(1), 
            '[r.310 c.1]': sumR310_037.toFixed(1), 
            '[r.311 c.1]': Decimal(values.CAP2_R311_C1 || 0).toDecimalPlaces(1), 
            '[r.312 c.1]': Decimal(values.CAP2_R312_C1 || 0).toDecimalPlaces(1), 
            '[sumR311_312]': sumR311_312.toFixed(1)
        });
        webform.errors.push({
            'fieldName': 'CAP2_R310_C1',
            'msg': errorMsg
        });
    }
//End 64-037

    //  var sumR320 = Decimal(values.CAP3_R330_C1 || 0).plus(values.CAP3_R340_C1 || 0).plus(values.CAP3_R350_C1 || 0);

    // if (!(Decimal(values.CAP3_R320_C1 || 0) >= sumR320)) {
    //     webform.errors.push({
    //         'fieldName': 'CAP3_R320_C1',
    //         'msg': Drupal.t('Cod eroare: 64-038, Cap.3 [r.320 c.1] >= [r.330 c.1]+ [r.340 c.1] + [r.350 c.1]')
    //     });
    // }

//Start 64-038
    var cap3R330C1 = Decimal(values.CAP3_R330_C1 || 0);
    var cap3R340C1 = Decimal(values.CAP3_R340_C1 || 0);
    var cap3R350C1 = Decimal(values.CAP3_R350_C1 || 0);
    var cap3R320C1 = Decimal(values.CAP3_R320_C1 || 0);

    
    var sumR320 = cap3R330C1.plus(cap3R340C1).plus(cap3R350C1);
    sumR320 = sumR320.toDecimalPlaces(1);
    cap3R320C1 = cap3R320C1.toDecimalPlaces(1);

      if (cap3R320C1.lessThan(sumR320)) 
    
    {
        webform.errors.push({
            'fieldName': 'CAP3_R320_C1',
            'msg': Drupal.t('Cod eroare: 64-038, Cap.3 [r.320 c.1 = @cap3R320C1] < [r.330 c.1 = @cap3R330C1] + [r.340 c.1 = @cap3R340C1] + [r.350 c.1 = @cap3R350C1],  [@sumR320]', { '@sumR320': sumR320.toFixed(1), '@cap3R320C1': cap3R320C1.toFixed(1), '@cap3R330C1': cap3R330C1.toFixed(1), '@cap3R340C1': cap3R340C1.toFixed(1), '@cap3R350C1': cap3R350C1.toFixed(1) })
        });
    }

//End 64-038


    //Start 64-108
    var cap3R330C2 = Decimal(values.CAP3_R330_C2 || 0);
    var cap3R340C2 = Decimal(values.CAP3_R340_C2 || 0);
    var cap3R350C2 = Decimal(values.CAP3_R350_C2 || 0);
    var cap3R320C2 = Decimal(values.CAP3_R320_C2 || 0);


    var sumR320_C2 = cap3R330C2.plus(cap3R340C2).plus(cap3R350C2);
    sumR320_C2 = sumR320.toDecimalPlaces(1);
    cap3R320C2 = cap3R320C2.toDecimalPlaces(1);

    if (cap3R320C2.lessThan(sumR320_C2)) {
        webform.errors.push({
            'fieldName': 'CAP3_R320_C2',
            'msg': Drupal.t('Cod eroare: 64-108, Cap.3 [r.320 c.2 = @cap3R320C2] < [r.330 c.2 = @cap3R330C2] + [r.340 c.2 = @cap3R340C2] + [r.350 c.2 = @cap3R350C2],  [@sumR320_C2]', { '@sumR320_C2': sumR320_C2.toFixed(1), '@cap3R320C2': cap3R320C2.toFixed(1), '@cap3R330C2': cap3R330C2.toFixed(1), '@cap3R340C2': cap3R340C2.toFixed(1), '@cap3R350C2': cap3R350C2.toFixed(1) })
        });
    }

    //End 64-108


    if (Decimal(values.CAP1_R111_C1 || 0).greaterThan(values.CAP1_R110_C1 || 0)) {
        webform.errors.push({
            'fieldName': 'CAP1_R111_C1',
            'msg': Drupal.t('Cod eroare: 3.08, [r.111 c.1] <= [r.110 c.1]')
        });
    }




//--------------------------------------------------------------------------------
//Show all variable
    // if (!Decimal(values.CAP4_R400_C3 || 0).equals(values.CAP1_R150_C1 || 0)) {
    //     webform.errors.push({
    //         'fieldName': 'CAP4_R400_C3',
    //         'msg': Drupal.t('Cod eroare: 64-007, [r.400 c.1] = [r.150 c.1]')
    //     });
    // }



    if (!Decimal(values.CAP4_R400_C3 || 0).equals(values.CAP1_R150_C1 || 0)) {
        webform.errors.push({
            'fieldName': 'CAP4_R400_C3',
            'msg': Drupal.t('Cod eroare: 64-007, [r.400 c.1] = [r.150 c.1] unde  [r.400 c.1] = ' + Decimal(values.CAP4_R400_C3 || 0).toString() + ' <>  [r.150 c.1] = ' + Decimal(values.CAP1_R150_C1 || 0).toString())
        });
    }


    if (!Decimal(values.CAP4_R400_C4 || 0).equals(values.CAP5_R500_C9 || 0)) {
        webform.errors.push({
            'fieldName': 'CAP4_R400_C4',
            'msg': Drupal.t('Cod eroare: 64-009, [r.400 c.2] = [r.500 c.2]')
        });
    }

    if (!Decimal(values.CAP4_R400_C5 || 0).equals(values.CAP2_R200_C1 || 0)) {
        webform.errors.push({
            'fieldName': 'CAP4_R400_C5',
            'msg': Drupal.t('Cod eroare: 64-008, [r.400 c.3] = [r.200 c.1]')
        });
    }

    if (!Decimal(values.CAP5_R500_C8 || 0).equals(values.CAP1_R150_C1 || 0)) {
        webform.errors.push({
            'fieldName': 'CAP5_R500_C8',
            'msg': Drupal.t('Cod eroare: 64-013, [r.500 c.1] = [r.150 c.1]')
        });
    }

    if (!Decimal(values.CAP5_R500_C9 || 0).equals(values.CAP4_R400_C4 || 0)) {
        webform.errors.push({
            'fieldName': 'CAP5_R500_C9',
            'msg': Drupal.t('Cod eroare: 64-014, [r.500 c.2] = [r.400 c.2]')
        });
    }

    if (!Decimal(values.CAP5_R500_C10 || 0).equals(values.CAP2_R270_C1 || 0)) {
        webform.errors.push({
            'fieldName': 'CAP5_R500_C10',
            'msg': Drupal.t('Cod eroare: 64-017, [r.500 c.3] = [r.270 c.1]')
        });
    }



    //-------------------------------------------------------------------------------



    
    var rez1 = new Decimal(0),
        rez2 = new Decimal(0),
        rez3 = new Decimal(0),
        firstEntry = true;

    for (var i = 0; i < values.CAP5_R_C8.length; i++) {
        rez1 = rez1.plus(values.CAP5_R_C8[i] || 0);
        rez2 = rez2.plus(values.CAP5_R_C9[i] || 0);
        rez3 = rez3.plus(values.CAP5_R_C10[i] || 0);

        if (values.CAP5_R_C32[0] !== "SEDIUL CENTRAL" && firstEntry) {
            firstEntry = false;
            webform.warnings.push({
                'fieldName': 'CAP5_R_C32',
                'index': i,
                'msg': Drupal.t('Cod eroare: 5.08, In cap.5 in coloana C pentru rind [510] trebuie sa introduceti "SEDIUL CENTRAL"')
            });
        }
    }

    var countCap4Rows = 0;
    var emptyFields = true;
    for (var i = 0; i < values.CAP4_R_C31.length; i++) {
        if (values.CAP4_R_C31[i]) {
            countCap4Rows++;
            if (values.CAP4_R_C31[i] != '' && i < 10) {
                emptyFields = false;
            }
        }
    }

    var countCap1SpecificRows = 0;
    var cap1SpecificFields = ['CAP1_R100_C1', 'CAP1_R110_C1', 'CAP1_R120_C1', 'CAP1_R130_C1', 'CAP1_R140_C1'];
    for (var fi = 0; fi < cap1SpecificFields.length; fi++) {
        if (values[cap1SpecificFields[fi]]) {
            countCap1SpecificRows++;
        }
    }

    for (var i = 0; i < values.CAP4_R_C31.length; i++) {
        if (countCap4Rows < countCap1SpecificRows) {
            webform.errors.push({
                'fieldName': 'CAP4_R_C31',
                'index': i,
                'msg': ''
            });
        }
    }

    if (countCap4Rows < countCap1SpecificRows) {
        webform.errors.push({
            'fieldName': '',
            'msg': Drupal.t('Cod eroare: 1.05, Dacă sunt completate rd. 100, 110, 120, 130, 140, atunci pentru fiecare rând completat se atribuie măcar un cod CAEM în cap. 4')
        });
    }

    if (emptyFields) {
        webform.errors.push({
            'fieldName': '',
            'msg': Drupal.t('Cod eroare: A.08, Dacă nu sunt completate rd.410-419 atunci - eroare critice')
        });
    }

    // if (!values.TITLU_R3_C31) {
    //     webform.errors.push({
    //         'fieldName': 'TITLU_R3_C31',
    //         'msg': Drupal.t('Cod eroare: A.09, Dacă nu sunt completate în antet Nr tel.  atunci - eroare critice')
    //     });
    // }

//-------------------add  --
    // Check if the field is empty or has more than 9 digits
    if (!values.TITLU_R3_C31 || !/^[0-9]{9}$/.test(values.TITLU_R3_C31)) {
        webform.errors.push({
            'fieldName': 'TITLU_R3_C31',
            'msg': Drupal.t(' Cod eroare: A.09 Introduceți doar un număr de telefon format din 9 cifre')
        });
    }

    // Check if the first digit is 0
    if (values.TITLU_R3_C31 && values.TITLU_R3_C31[0] !== '0') {
        webform.errors.push({
            'fieldName': 'TITLU_R3_C31',
            'msg': Drupal.t(' Cod eroare: A.09 Prima cifră a numărului de telefon trebuie să fie 0')
        });
    }

    // if (!(Decimal(values.CAP7_R700_C1 || 0) <= Decimal(values.CAP1_R112_C1 || 0))) {
    //     webform.errors.push({
    //         'fieldName': 'CAP7_R700_C1',
    //         'msg': Drupal.t('Cod eroare: 64-045, Cap.7 [r.700 c.1] <= Cap.1 [r.112 c.1]')
    //     });
    // }

    // Start 64-045
// ---------------------------------------------- 

    // function checkCAP(CAP7_R700_C1, CAP1_R112_C1) {
    //     if (isNaN(parseFloat(CAP7_R700_C1)) || isNaN(parseFloat(CAP1_R112_C1))) {
    //         throw new Error('Invalid input: both arguments must be numeric');
    //     }
    //     if (parseFloat(CAP7_R700_C1) > parseFloat(CAP1_R112_C1)) {
    //         throw new Error('Cod eroare: 64-045, Cap.7 [r.700 c.1] <=  Cap.1 [r.112 c.1], @CAP7_R700_C1 > @CAP1_R112_C1', {
    //             "@CAP7_R700_C1": CAP7_R700_C1,
    //             "@CAP1_R112_C1": CAP1_R112_C1
    //         });
    //     }
    // }

    // var CAP7_R700_C1 = parseFloat((values.CAP7_R700_C1) || 0).toFixed(1);
    // var CAP1_R112_C1 = parseFloat((values.CAP1_R112_C1) || 0).toFixed(1);

    // try {
    //     checkCAP(CAP7_R700_C1, CAP1_R112_C1);
    // } catch (err) {
    //     webform.errors.push({
    //         'fieldName': 'CAP7_R700_C1',
    //         'msg': Drupal.t(err.message, {
    //             '@CAP7_R700_C1': CAP7_R700_C1,
    //             '@CAP1_R112_C1': CAP1_R112_C1,
    //         }),
    //     });
    // }


// End  64-045



    // Start 64-006
    var sumR291 = Decimal(values.CAP2_R2911_C1 || 0).plus(values.CAP2_R2912_C1 || 0);
    var cap2R291C1 = Decimal(values.CAP2_R291_C1 || 0);

    // Round the values to one sign after zero
    sumR291 = sumR291.toDecimalPlaces(1);
    cap2R291C1 = cap2R291C1.toDecimalPlaces(1);

    if (cap2R291C1.lessThan(sumR291)) {
        var errorMsg = Drupal.t('Cod eroare: 64-006, r.291 c.1 >= r.2911c.1 + r.2912 c.1 - [r.291 c.1] < [r.2911c.1] + [r.2912 c.1] = [sumR291]', {
            '[sumR291]': sumR291.toFixed(1),
            '[r.291 c.1]': cap2R291C1.toFixed(1),
            '[r.2911c.1]': Decimal(values.CAP2_R2911_C1 || 0).toDecimalPlaces(1),
            '[r.2912 c.1]': Decimal(values.CAP2_R2912_C1 || 0).toDecimalPlaces(1)
        });
        webform.errors.push({
            'fieldName': 'CAP2_R291_C1',
            'msg': errorMsg
        });
    }
    // End 64-006


      // Start 64-047

    // var sumR730 = Decimal(values.CAP7_R731_C1 || 0).plus(values.CAP7_R732_C1 || 0).plus(values.CAP7_R733_C1 || 0);
    // var sumR730C1 = Decimal(values.CAP7_R730_C1 || 0);


    // // Round the values to one sign after zero
    // sumR730 = sumR730.toDecimalPlaces(1);
    // sumR730C1 = sumR730C1.toDecimalPlaces(1);

    // if (sumR730C1.lessThan(sumR730)) {
    //     var errorMsg = Drupal.t('Cod eroare: 64-047, Cap.7 r.730 c.1 >= r.731 c.1 + r.732 c.1 + r.733 c.1   - [r.730 c.1] < [r.731 c.1] + [r.732 c.1] + [r.733 c.1] = [sumR730]', {
    //         '[sumR730]': sumR730.toFixed(1),
    //         '[r.730 c.1]': sumR730C1.toFixed(1),
    //         '[r.731 c.1]': Decimal(values.CAP7_R731_C1 || 0).toDecimalPlaces(1),
    //         '[r.732 c.1]': Decimal(values.CAP7_R732_C1 || 0).toDecimalPlaces(1),
    //         '[r.733 c.1]': Decimal(values.CAP7_R733_C1 || 0).toDecimalPlaces(1)
    //     });
    //     webform.errors.push({
    //         'fieldName': 'CAP7_R730_C1',
    //         'msg': errorMsg
    //     });
    // }

 // End  64-047

//Start 64-048
    // var sumR770 = Decimal(values.CAP7_R771_C1 || 0).plus(values.CAP7_R772_C1 || 0);
    // var sumR770C1 = Decimal(values.CAP7_R770_C1 || 0);


    // // Round the values to one sign after zero
    // sumR770 = sumR770.toDecimalPlaces(1);
    // sumR770C1 = sumR770C1.toDecimalPlaces(1);

    // if (sumR770C1.lessThan(sumR770)) {
    //     var errorMsg = Drupal.t('Cod eroare: 64-048, Cap.7 r.770 c.1 >= r.771 c.1 + r.772 c.1   - [r.770 c.1] < [r.771 c.1] + [r.772 c.1]  = [sumR770]', {
    //         '[sumR770]': sumR770.toFixed(1),
    //         '[r.770 c.1]': sumR770C1.toFixed(1),
    //         '[r.771 c.1]': Decimal(values.CAP7_R771_C1 || 0).toDecimalPlaces(1),
    //         '[r.772 c.1]': Decimal(values.CAP7_R772_C1 || 0).toDecimalPlaces(1)
          
    //     });
    //     webform.errors.push({
    //         'fieldName': 'CAP7_R770_C1',
    //         'msg': errorMsg
    //     });
    // }
 // End 64-048

//-------------------------------------------------------------------



//     function checkCAP_2(CAP8_R800_C1, CAP1_R111_C1) {
//         if (isNaN(parseFloat(CAP8_R800_C1)) || isNaN(parseFloat(CAP1_R111_C1))) {
//             throw new Error('Invalid input: both arguments must be numeric');
//         }
//         if (parseFloat(CAP8_R800_C1) > parseFloat(CAP1_R111_C1)) {
//             throw new Error(`Cod eroare: @CAP8_R800_C1:${CAP8_R800_C1} @CAP1_R111_C1:${CAP1_R111_C1}`);
//         }
//     }

//     var CAP8_R800_C1 = parseFloat(values.CAP8_R800_C1) || 0;
//     var CAP1_R111_C1 = parseFloat(values.CAP1_R111_C1) || 0;



//     try {
//         checkCAP_2(CAP8_R800_C1, CAP1_R111_C1);
//     } catch (err) {

//         var errorMessage = Drupal.t(' Cod eroare: 64-050, Cap.8 [r.800 c.1] <= Cap.1 [r.111 c.1]', {
//             '@CAP8_R800_C1': CAP8_R800_C1,
//             '@CAP1_R111_C1': CAP1_R111_C1,
//         }) + ' - ' + CAP8_R800_C1 + ' > ' + CAP1_R111_C1;


//         webform.errors.push({
//             'fieldName': 'CAP8_R800_C1',

//             'msg': errorMessage,
//         });
//     }
// //-----------------------------------------------


//     function checkCAP_1(CAP8_R800_C1, CAP1_R111_C1) {
//         if (isNaN(parseFloat(CAP8_R800_C1)) || isNaN(parseFloat(CAP1_R111_C1))) {
//             throw new Error('Invalid input: both arguments must be numeric');
//         }
//         if (parseFloat(CAP8_R800_C1) < parseFloat(CAP1_R111_C1)) {
//             throw new Error(`Cod eroare: @CAP8_R800_C1:${CAP8_R800_C1} @CAP1_R111_C1:${CAP1_R111_C1}`);
//         }
//     }

//     var CAP8_R800_C1 = parseFloat(values.CAP8_R800_C1) || 0;
//     var CAP1_R111_C1 = parseFloat(values.CAP1_R111_C1) || 0;

    //64-046
//---------------------------------------------------------------------------------

    // var CAP7_R720_C1 = parseFloat(values.CAP7_R720_C1) || 0;
    // var CAP7_R721_C1 = parseFloat(values.CAP7_R721_C1) || 0;



    // try {
    //     checkCAP_1(CAP7_R720_C1, CAP7_R721_C1);
    // } catch (err) {

    //     var errorMessage = Drupal.t(' Cod eroare: 64-046, Cap.7 [r.720 c.1] >= [r.721 c.1]', {
    //         '@CAP7_R720_C1': CAP7_R720_C1,
    //         '@CAP7_R721_C1': CAP7_R721_C1,
    //     }) + ' - ' + CAP7_R720_C1 + ' < ' + CAP7_R721_C1;


    //     webform.errors.push({
    //         'fieldName': 'CAP7_R720_C1',

    //         'msg': errorMessage,
    //     });
    // }


//End 64-046

//Start 64-052
//---------------------------------------------------------------------------------



    // var CAP8_R900_C1 = parseFloat(values.CAP8_R900_C1) || 0;
    // var CAP8_R901_C1 = parseFloat(values.CAP8_R901_C1) || 0;



    // try {
    //     checkCAP_1(CAP8_R900_C1, CAP8_R901_C1);
    // } catch (err) {

    //     var errorMessage = Drupal.t(' Cod eroare: 64-052, Cap.8 [r.900 c.1] >= [r.901 c.1]', {
    //         '@CAP8_R900_C1': CAP8_R900_C1,
    //         '@CAP8_R901_C1': CAP8_R901_C1,
    //     }) + ' - ' + CAP8_R900_C1 + ' < ' + CAP8_R901_C1;


    //     webform.errors.push({
    //         'fieldName': 'CAP8_R900_C1',

    //         'msg': errorMessage,
    //     });
    // }
//------------------------------------------------------------------------------------------------------
//End 64-052
//Start 64-049
   
    
    // var sumR870 = Decimal(values.CAP8_R871_C1 || 0).plus(values.CAP8_R872_C1 || 0);
    // var CAP8_R870_C1 = Decimal(values.CAP8_R870_C1 || 0);
    // var CAP8_R871_C1 = Decimal(values.CAP8_R871_C1 || 0);
    // var CAP8_R872_C1 = Decimal(values.CAP8_R872_C1 || 0);

  

    // // Round the values to one sign after zero
    // sumR870 = sumR870.toDecimalPlaces(1);
    // CAP8_R870_C1 = CAP8_R870_C1.toDecimalPlaces(1);

   

    // if (CAP8_R870_C1.lessThan(sumR870)) {
    //     webform.errors.push({
    //         'fieldName': 'CAP8_R870_C1',
    //         'msg': Drupal.t('Cod eroare: 64-049, Cap.8 [r.870 c.1] >= [r.871 c.1] = @CAP8_R871_C1 + [r.872 c.1] = @CAP8_R872_C1,   @CAP8_R870_C1 <  Suma  [r.871 c.1], [r.872 c.1] -   @sumR870.', { '@sumR870': sumR870, '@CAP8_R870_C1': CAP8_R870_C1,  '@CAP8_R871_C1': CAP8_R871_C1, '@CAP8_R872_C1': CAP8_R872_C1})
    //     });
    // }

//End 64-049




    
    if (values.CAP4_R400_C4 == "") {
        webform.errors.push({
            'fieldName': 'CAP4_R400_C4',
            'msg': Drupal.t('Cod eroare: A.01, Cap.4 [r.400 c.2] >= 0')
        });
    }

    
  //--------------------------------------------------------------------------------------------------------------------  
    
 // -- Start    64-102

    // {
    //     function fun_row_36_001(row) {
    //         var i;
    //         i = row;
    //         if (


    //             2130 == i || 2120 == i || 2101 == i || 2103 == i || 2105 == i || 2106 == i || 2107 == i || 2108 == i
    //             || 2109 == i

               

    //         )
    //             return true;

    //     }

    //     // Start 64-102
    //     for (var i = 2100; i < 2131; i++) {
    //         {
    //             if (fun_row_36_001((i))) {
                     
                    
    //                 var col1 = 0;
    //                 var col2 = 0;
    //                 var col3 = 0;
                  

    //                 if (!isNaN(Number(values["CAP21_R" + i + "_3_C1"]))) {
    //                     var col3 = Number(values["CAP21_R" + i + "_3_C1"]);
    //                 }

    //                 if (!isNaN(Number(values["CAP21_R" + i + "_2_C1"]))) {
    //                     var col2 = Number(values["CAP21_R" + i + "_2_C1"]);
    //                 }

                  
    //                 if (!isNaN(Number(values["CAP21_R" + i + "_1_C1"]))) {
    //                     var col1 = Number(values["CAP21_R" + i + "_1_C1"]);
    //                 }

    //                 var SUM_COL2_COL4 = (col2 + col3).toFixed(1)

    //                 if (col1 < (SUM_COL2_COL4)) {
    //                     webform.errors.push({
    //                         'fieldName': 'CAP21_R' + i + '_1_C1',
    //                         'weight': 1,
    //                         'msg': Drupal.t('Cod eroare: 64-102  CAP 2.1 col.1 ≥ col 2 + col. 3 + col.4  pe toate rindurile - @col1 <  @SUM_COL2_COL4 ', { "@col1": col1, "@SUM_COL2_COL4": SUM_COL2_COL4 })
    //                     });
    //                 }

    //             }







    //         }
    //     }


    // }



    // {
    //     function fun_row_36_002(row) {
    //         var i;
    //         i = row;
    //         if (


    //             2102 == i || 2104 == i || 2110 == i || 2111 == i || 2112 == i || 2113 == i || 2114 == i || 2115 == i
    //             || 2116 == i || 2117 == i || 2118 == i || 2119 == i || 2121 == i  || 2123 == i || 2124 == i || 2125 == i || 2127 == i
    //             || 2128 == i



    //         )
    //             return true;

    //     }

    //     // Start 64-102
    // //     for (var i = 2100; i < 2131; i++) {
    // //         {
    // //             if (fun_row_36_002((i))) {

    // //                 var col1 = 0;
    // //                 var col2 = 0;
    // //                 var col3 = 0;
    // //                 var col4 = 0;

    // //                 if (!isNaN(Number(values["CAP21_R" + i + "_3_C1"]))) {
    // //                     var col3 = Number(values["CAP21_R" + i + "_3_C1"]);
    // //                 }

    // //                 if (!isNaN(Number(values["CAP21_R" + i + "_2_C1"]))) {
    // //                     var col2 = Number(values["CAP21_R" + i + "_2_C1"]);
    // //                 }

    // //                 if (!isNaN(Number(values["CAP21_R" + i + "_4_C1"]))) {
    // //                     var col4 = Number(values["CAP21_R" + i + "_4_C1"]);
    // //                 }

         

    // //                 if (!isNaN(Number(values["CAP21_R" + i + "_1_C1"]))) {
    // //                     var col1 = Number(values["CAP21_R" + i + "_1_C1"]);
    // //                 }

    // //                 var SUM_COL2_COL4 = (col2 + col3 + col4).toFixed(1)

              
                    
    // //                  if (col1 < (SUM_COL2_COL4)) 
                    
                    
    // //                 {
    // //                     webform.errors.push({
    // //                         'fieldName': 'CAP21_R' + i + '_1_C1',
    // //                         'weight': 1,
    // //                         'msg': Drupal.t('Cod eroare: 64-102  CAP 2.1 col.1 ≥ col 2 + col. 3 + col.4  pe toate rindurile - @col1 <  @SUM_COL2_COL4 ', { "@col1": col1, "@SUM_COL2_COL4": SUM_COL2_COL4 })
    // //                     });
    // //                 }

    // //             }







    // //         }
    // //     }
    // // }
    //  //End 64-102




    // // Start 64-101
    // // var sumCol1 = 0;

    // // for (var i = 2101; i < 2131; i++) {
    // //     if (!isNaN(Number(values["CAP21_R" + i + "_1_C1"]))) {
    // //         sumCol1 += Number(values["CAP21_R" + i + "_1_C1"]);
    // //     }
    //  }

    // if (!isNaN(Number(values["CAP21_R2100_1_C1"]))) {
    //     var col1 = Number(values["CAP21_R2100_1_C1"]);
    // }

    // if (Number(col1.toFixed(1)) !== Number(sumCol1.toFixed(1))) {
    //     webform.errors.push({
    //         'fieldName': 'CAP21_R2100_1_C1',
    //         'weight': 1,
    //         'msg': Drupal.t('Cod eroare: 64-101  CAP 2.1 rd. 2100 col.1 ≠ (rd. 2101+…+rd.2130) col.1. col1 = @col1, sumCol1 = @sumCol1', { '@col1': col1.toFixed(1), '@sumCol1': sumCol1.toFixed(1) })
    //     });
    // }
// End  64-101


  // Start 64 - 103
    // if (!isNaN(Number(values["CAP2_R220_C1"]))) {
    //     var col2 = Number(values["CAP2_R220_C1"]);
    // }

    // if (!isNaN(Number(values["CAP2_R240_C1"]))) {
    //     var col4 = Number(values["CAP2_R240_C1"]);
    // }



    // if (!isNaN(Number(values["CAP21_R2100_1_C1"]))) {
    //     var col1 = Number(values["CAP21_R2100_1_C1"]);
    // }

    // var SUM_COL2_COL4 = col2 +  col4
    // var SUM_COL2_COL4_F = parseFloat(SUM_COL2_COL4.toFixed(1));
 
    // if (col1 !== SUM_COL2_COL4_F) {
        
        
    //     webform.errors.push({
    //         'fieldName': 'CAP21_R2100_1_C1',
    //         'weight': 4,
    //         'msg': Drupal.t('Cod eroare: 64-103  CAP 2.1 2100 col.1 = CAP 2  220 + 240 - @col1 <>   @SUM_COL2_COL4_F ', { "@col1": col1, "@SUM_COL2_COL4_F": SUM_COL2_COL4_F })
    //     });


    // }

//End 64 - 103


 // Start 64 - 104

    if (!isNaN(Number(values["CAP2_R291_C1"]))) {
        var col2 = Number(values["CAP2_R2931_C1"]);
    }



    if (!isNaN(Number(values["CAP2_R293_C1"]))) {
        var col1 = Number(values["CAP2_R293_C1"]);
    }

    var SUM_COL2_COL4 = col2 
    var SUM_COL2_COL4_F = parseFloat(SUM_COL2_COL4.toFixed(1));

    if (col1 <  SUM_COL2_COL4_F) {
        webform.errors.push({
            'fieldName': 'CAP2_R293_C1',
            'weight': 5,
            'msg': Drupal.t('Cod eroare: 64-104  CAP.2 [r.293 c.1] >= [r.2931c.1] - @col1 <   @SUM_COL2_COL4_F ', { "@col1": col1, "@SUM_COL2_COL4_F": SUM_COL2_COL4_F })
        });
    }

  // End   64 - 104 



    //Start  64-051
    // var sumR890 = Decimal(values.CAP8_R891_C1 || 0).plus(values.CAP8_R892_C1 || 0).plus(values.CAP8_R893_C1 || 0).plus(values.CAP8_R894_C1 || 0);
    // var CAP8_R890_C1 = Decimal(values.CAP8_R890_C1 || 0);
    // var CAP8_R891_C1 = Decimal(values.CAP8_R891_C1 || 0);
    // var CAP8_R892_C1 = Decimal(values.CAP8_R892_C1 || 0);
    // var CAP8_R893_C1 = Decimal(values.CAP8_R893_C1 || 0);
    // var CAP8_R894_C1 = Decimal(values.CAP8_R894_C1 || 0);


    // // Round the values to one sign after zero
    // sumR890 = sumR890.toDecimalPlaces(1);
    // CAP8_R890_C1 = CAP8_R890_C1.toDecimalPlaces(1);
    // CAP8_R891_C1 = CAP8_R891_C1.toDecimalPlaces(1);
    // CAP8_R892_C1 = CAP8_R892_C1.toDecimalPlaces(1);
    // CAP8_R893_C1 = CAP8_R893_C1.toDecimalPlaces(1);
    // CAP8_R894_C1 = CAP8_R894_C1.toDecimalPlaces(1);



    // if (CAP8_R890_C1.lessThan(sumR890)) {
    //     webform.errors.push({
    //         'fieldName': 'CAP8_R890_C1',
    //         'msg': Drupal.t('Cod eroare: 64-051, Cap.8 [r.890 c.1] >= [r.891 c.1] = @CAP8_R891_C1 + [r.892 c.1] = @CAP8_R892_C1 + [r.893 c.1] = @CAP8_R893_C1 + [r.894 c.1] = @CAP8_R894_C1. @CAP8_R890_C1 <  Suma  [r.891 c.1], [r.892 c.1], [r.893 c.1], [r.894 c.1] -   @sumR890.', { '@sumR890': sumR890, '@CAP8_R890_C1': CAP8_R890_C1, '@CAP8_R891_C1': CAP8_R891_C1, '@CAP8_R892_C1': CAP8_R892_C1, '@CAP8_R893_C1': CAP8_R893_C1, '@CAP8_R894_C1': CAP8_R894_C1 })
    //     });
    // }
//End  64-051



    // Start 64 - 105
    
    // Calculate the total value 
    function calculateTotal64_105(values) {
        return Decimal(values.CAP2_R2961_C1 || 0)
            .plus(values.CAP2_R2962_C1 || 0);
         
    }

    // Check if CAP2_R296_C1 is less than the total value
    function check64_105(values, webform) {
        var total64_105 = calculateTotal64_105(values).toDecimalPlaces(1);
        var CAP2_R296_C1 = Decimal(values.CAP2_R296_C1 || 0);
        CAP2_R296_C1 = CAP2_R296_C1.toDecimalPlaces(1);

        if (CAP2_R296_C1.lessThan(total64_105)) {
            webform.errors.push({
                'fieldName': 'CAP2_R296_C1',
                'msg': Drupal.t('Cod eroare: 64-105  CAP.2 [r.296 c.1] >= [r.2961c.1] + [r.2962 c.1] -  @CAP2_R296_C1 <   @total64_105', { "@CAP2_R296_C1": values.CAP2_R296_C1, "@total64_105": total64_105.toFixed() })
            });
        }
    }

    // Call the checkCap2R240C1 function
    check64_105(values, webform);







  // End   64 - 105



// Start  64-002

        if (Decimal(values.CAP1_R151_C1 || 0).greaterThan(values.CAP1_R150_C1 || 0)) {
            webform.errors.push({
                'fieldName': 'CAP1_R151_C1',
                'msg': Drupal.t('Cod eroare: 64-002, [r.151 c.1] <= [r.150 c.1] -  @CAP1_R151_C1 >   @CAP1_R150_C1', { "@CAP1_R151_C1": values.CAP1_R151_C1, "@CAP1_R150_C1": values.CAP1_R150_C1 })
            });
        }

// End  64-002


//Start 64-033
{


        // Calculate the total value of CAP2_R221_C1 through CAP2_R243_C1
        function calculateTotalCap2R221ToR222C1(values) {
            return Decimal(values.CAP2_R221_C1 || 0)
                .plus(values.CAP2_R222_C1 || 0);
               
        }

        // Check if CAP2_R220_C1 is less than the total value of CAP2_R241_C1 through CAP2_R243_C1
        function checkCap2R220C1(values, webform) {
            var totalCap2R221ToR222C1 = calculateTotalCap2R221ToR222C1(values).toDecimalPlaces(1);

            var CAP2_R220_C1 = Decimal(values.CAP2_R220_C1 || 0).toDecimalPlaces(1);
            CAP2_R220_C1 = CAP2_R220_C1.toDecimalPlaces(1);


            if (CAP2_R220_C1.lessThan(totalCap2R221ToR222C1)) {
                webform.errors.push({
                    'fieldName': 'CAP2_R220_C1',
                    'msg': Drupal.t('Cod eroare: 64-033, [r.220 c.1] >= [r.221c.1] + [r.222 c.1] -  @CAP2_R220_C1 <   @totalCap2R221ToR222C1', { "@CAP2_R220_C1": values.CAP2_R220_C1, "@totalCap2R221ToR222C1": totalCap2R221ToR222C1.toFixed() })
                });
            }
        }

        // Call the checkCap2R240C1 function
        checkCap2R220C1(values, webform);



 }

//End 64-033

//Start 64-034

// Calculate the total value of CAP2_R241_C1 through CAP2_R243_C1
    function calculateTotalCap2R241ToR243C1(values) {
        return Decimal(values.CAP2_R241_C1 || 0)
            .plus(values.CAP2_R242_C1 || 0)
            .plus(values.CAP2_R243_C1 || 0);
    }

    // Check if CAP2_R240_C1 is less than the total value of CAP2_R241_C1 through CAP2_R243_C1
    function checkCap2R240C1(values, webform) {
        var totalCap2R241ToR243C1 = calculateTotalCap2R241ToR243C1(values).toDecimalPlaces(1);

        var CAP2_R240_C1 = Decimal(values.CAP2_R240_C1 || 0).toDecimalPlaces(1);
        CAP2_R240_C1 = CAP2_R240_C1.toDecimalPlaces(1);
       
        if (CAP2_R240_C1.lessThan(totalCap2R241ToR243C1)) {
            webform.errors.push({
                'fieldName': 'CAP2_R240_C1',
                'msg': Drupal.t('Cod eroare: 64-034, [r.240 c.1] >= [r.241c.1] + [r.242 c.1] + [r.243 c.1] -  @CAP2_R240_C1 <   @totalCap2R241ToR243C1', { "@CAP2_R240_C1": values.CAP2_R240_C1, "@totalCap2R241ToR243C1": totalCap2R241ToR243C1.toFixed() })
            });
        }
    }

    // Call the checkCap2R240C1 function
    checkCap2R240C1(values, webform);
    

    //End 64-034






     webform.validatorsStatus.asa23 = 1;
    validateWebform();
};