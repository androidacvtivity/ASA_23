var from = "";

$(document).ready(function () {
    form = $("#formDenShort").val();
    fASA_CAP2();
});

$(function () {
    // OnKeyPress ```````````````````````````````````````````````````````````````````````````````
    $("input:not([type='button']):not([readonly]):not([disabled])").on("change", function (e) {
        fASA_CAP2();
    });
});

function fASA_CAP2() {
    var R210_C1 = $("#64_1125_58749_210_1");
    var R220_C1 = $("#64_1125_58750_220_1");
    var R240_C1 = $("#64_1125_58753_240_1");
    var R260_C1 = $("#64_1125_58757_260_1");
    var R270_C1 = $("#64_1125_58758_270_1");
    var R280_C1 = $("#64_1125_58759_280_1");
    var R290_C1 = $("#64_1125_58762_290_1");

    var R281_C1 = $("#64_1125_58760_281_1");
    var R282_C1 = $("#64_1125_58761_282_1");

    var R291_C1 = $("#64_1125_58763_291_1");
    var R292_C1 = $("#64_1125_58766_292_1");
    var R293_C1 = $("#64_1125_58767_293_1");
    var R294_C1 = $("#64_1125_58769_294_1");
    var R295_C1 = $("#64_1125_58774_295_1");
    var R296_C1 = $("#64_1125_58775_296_1");
    var R297_C1 = $("#64_1125_58778_297_1");

    //--------------readOnly input -----------------------
    R210_C1.prop("readonly", true);
    R280_C1.prop("readonly", true);
    R290_C1.prop("readonly", true);

//Show 0.0 but need null tray again

    // Calculate R290
    let r290Result = (
        parseFloat(Number(R291_C1.val()).toFixed(1)) +
        parseFloat(Number(R292_C1.val()).toFixed(1)) +
        parseFloat(Number(R293_C1.val()).toFixed(1)) +
        parseFloat(Number(R294_C1.val()).toFixed(1)) +
        parseFloat(Number(R295_C1.val()).toFixed(1)) +
        parseFloat(Number(R296_C1.val()).toFixed(1)) +
        parseFloat(Number(R297_C1.val()).toFixed(1))
    ).toFixed(1);
    R290_C1.val(r290Result == 0 ? null : r290Result);

    // Calculate R280
    let r280Result = (
        parseFloat(Number(R281_C1.val()).toFixed(1)) +
        parseFloat(Number(R282_C1.val()).toFixed(1))
    ).toFixed(1);
    R280_C1.val(r280Result == 0 ? null : r280Result);

    // Calculate R210
    let r210Result = (
        parseFloat(Number(R220_C1.val()).toFixed(1)) +
        parseFloat(Number(R240_C1.val()).toFixed(1)) +
        parseFloat(Number(R260_C1.val()).toFixed(1)) +
        parseFloat(Number(R270_C1.val()).toFixed(1)) +
        parseFloat(Number(R280_C1.val()).toFixed(1)) +
        parseFloat(Number(R290_C1.val()).toFixed(1))
    ).toFixed(1);
    R210_C1.val.r210Result == 0 ? null : r210Result;


}
