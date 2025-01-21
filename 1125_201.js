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
    var R210_C1 = $("#64_1125_70158_210_1");
    var R220_C1 = $("#64_1125_70168_220_1");
    var R240_C1 = $("#64_1125_70175_240_1");
    var R260_C1 = $("#64_1125_70164_260_1");
    var R270_C1 = $("#64_1125_70165_270_1");
    var R280_C1 = $("#64_1125_70180_280_1");
    var R290_C1 = $("#64_1125_70176_290_1");
    var R300_C1 = $("#64_1125_70188_300_1");
    var R305_C1 = $("#64_1125_70189_305_1");
    var R310_C1 = $("#64_1125_70190_310_1");

  

    //--------------readOnly input -----------------------
    R210_C1.prop("readonly", true);
    R300_C1.prop("readonly", true);
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
        parseFloat(Number(R305_C1.val()).toFixed(1)) +
        parseFloat(Number(R310_C1.val()).toFixed(1))
    ).toFixed(1);
    R300_C1.val(r280Result == 0 ? null : r280Result);

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
