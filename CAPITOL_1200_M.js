
//Modify - if the amount is 0.0 display null - nothing if not display the amount value
var from = "";

$(document).ready(function () {
    form = $("#formDenShort").val();
    fASA_CAP2_1();
});

$(function () {
    // OnKeyPress ```````````````````````````````````````````````````````````````````````````````
    $("input:not([type='button']):not([readonly]):not([disabled])").on("change", function (e) {
        fASA_CAP2_1();
    });
});
function fASA_CAP2_1() {

    var R2100_1 = $("#64_1200_111891_2100-1_1");
    var R2101_1 = $("#64_1200_111902_2101-1_1");
    var R2102_1 = $("#64_1200_111893_2102-1_1");
    var R2103_1 = $("#64_1200_111906_2103-1_1");
    var R2104_1 = $("#64_1200_111839_2104-1_1");
    var R2105_1 = $("#64_1200_111923_2105-1_1");
    var R2106_1 = $("#64_1200_111864_2106-1_1");
    var R2107_1 = $("#64_1200_111849_2107-1_1");
    var R2108_1 = $("#64_1200_111850_2108-1_1");
    var R2109_1 = $("#64_1200_111852_2109-1_1");
    var R2110_1 = $("#64_1200_111840_2110-1_1");
    var R2111_1 = $("#64_1200_111865_2111-1_1");
    var R2112_1 = $("#64_1200_111926_2112-1_1");
    var R2113_1 = $("#64_1200_111881_2113-1_1");
    var R2114_1 = $("#64_1200_111867_2114-1_1");
    var R2115_1 = $("#64_1200_111844_2115-1_1");
    var R2116_1 = $("#64_1200_111869_2116-1_1");
    var R2117_1 = $("#64_1200_111831_2117-1_1");
    var R2118_1 = $("#64_1200_111929_2118-1_1");
    var R2119_1 = $("#64_1200_111885_2119-1_1");
    var R2120_1 = $("#64_1200_111858_2120-1_1");
    var R2121_1 = $("#64_1200_111859_2121-1_1");
    var R2122_1 = $("#64_1200_111916_2122-1_1");
    var R2123_1 = $("#64_1200_111861_2123-1_1");
    var R2124_1 = $("#64_1200_111835_2124-1_1");
    var R2125_1 = $("#64_1200_111836_2125-1_1");
    var R2126_1 = $("#64_1200_111901_2126-1_1");
    var R2127_1 = $("#64_1200_111919_2127-1_1");
    var R2128_1 = $("#64_1200_111888_2128-1_1");
    var R2129_1 = $("#64_1200_111878_2129-1_1");
    var R2130_1 = $("#64_1200_111921_2130-1_1");






    //--------------readOnly input -----------------------
    R2100_1.prop("readonly", true);



    //-------------------------------Rind 610------------------------------------------------------ 

    // R2100_1.val((parseFloat(Number(R2101_1.val()).toFixed(1)) + parseFloat(Number(R2102_1.val()).toFixed(1))
    //     + parseFloat(Number(R2103_1.val()).toFixed(1))
    //     + parseFloat(Number(R2104_1.val()).toFixed(1))
    //     + parseFloat(Number(R2105_1.val()).toFixed(1))
    //     + parseFloat(Number(R2106_1.val()).toFixed(1))
    //     + parseFloat(Number(R2107_1.val()).toFixed(1))
    //     + parseFloat(Number(R2108_1.val()).toFixed(1))
    //     + parseFloat(Number(R2109_1.val()).toFixed(1))
    //     + parseFloat(Number(R2110_1.val()).toFixed(1))
    //     + parseFloat(Number(R2111_1.val()).toFixed(1))
    //     + parseFloat(Number(R2112_1.val()).toFixed(1))
    //     + parseFloat(Number(R2113_1.val()).toFixed(1))
    //     + parseFloat(Number(R2114_1.val()).toFixed(1))
    //     + parseFloat(Number(R2115_1.val()).toFixed(1))
    //     + parseFloat(Number(R2116_1.val()).toFixed(1))
    //     + parseFloat(Number(R2117_1.val()).toFixed(1))
    //     + parseFloat(Number(R2118_1.val()).toFixed(1))
    //     + parseFloat(Number(R2119_1.val()).toFixed(1))
    //     + parseFloat(Number(R2120_1.val()).toFixed(1))
    //     + parseFloat(Number(R2121_1.val()).toFixed(1))
    //     + parseFloat(Number(R2122_1.val()).toFixed(1))
    //     + parseFloat(Number(R2123_1.val()).toFixed(1))
    //     + parseFloat(Number(R2124_1.val()).toFixed(1))
    //     + parseFloat(Number(R2125_1.val()).toFixed(1))
    //     + parseFloat(Number(R2126_1.val()).toFixed(1))
    //     + parseFloat(Number(R2127_1.val()).toFixed(1))
    //     + parseFloat(Number(R2128_1.val()).toFixed(1))
    //     + parseFloat(Number(R2129_1.val()).toFixed(1))
    //     + parseFloat(Number(R2130_1.val()).toFixed(1))


    // ).toFixed(1));


    //-------------------------------Rind 610------------------------------------------------------ 

    var total =
        parseFloat(Number(R2101_1.val()).toFixed(1)) +
        parseFloat(Number(R2102_1.val()).toFixed(1)) +
        parseFloat(Number(R2103_1.val()).toFixed(1)) +
        parseFloat(Number(R2104_1.val()).toFixed(1)) +
        parseFloat(Number(R2105_1.val()).toFixed(1)) +
        parseFloat(Number(R2106_1.val()).toFixed(1)) +
        parseFloat(Number(R2107_1.val()).toFixed(1)) +
        parseFloat(Number(R2108_1.val()).toFixed(1)) +
        parseFloat(Number(R2109_1.val()).toFixed(1)) +
        parseFloat(Number(R2110_1.val()).toFixed(1)) +
        parseFloat(Number(R2111_1.val()).toFixed(1)) +
        parseFloat(Number(R2112_1.val()).toFixed(1)) +
        parseFloat(Number(R2113_1.val()).toFixed(1)) +
        parseFloat(Number(R2114_1.val()).toFixed(1)) +
        parseFloat(Number(R2115_1.val()).toFixed(1)) +
        parseFloat(Number(R2116_1.val()).toFixed(1)) +
        parseFloat(Number(R2117_1.val()).toFixed(1)) +
        parseFloat(Number(R2118_1.val()).toFixed(1)) +
        parseFloat(Number(R2119_1.val()).toFixed(1)) +
        parseFloat(Number(R2120_1.val()).toFixed(1)) +
        parseFloat(Number(R2121_1.val()).toFixed(1)) +
        parseFloat(Number(R2122_1.val()).toFixed(1)) +
        parseFloat(Number(R2123_1.val()).toFixed(1)) +
        parseFloat(Number(R2124_1.val()).toFixed(1)) +
        parseFloat(Number(R2125_1.val()).toFixed(1)) +
        parseFloat(Number(R2126_1.val()).toFixed(1)) +
        parseFloat(Number(R2127_1.val()).toFixed(1)) +
        parseFloat(Number(R2128_1.val()).toFixed(1)) +
        parseFloat(Number(R2129_1.val()).toFixed(1)) +
        parseFloat(Number(R2130_1.val()).toFixed(1));

    // dacă total este 0 sau NaN → afișăm gol
    if (!total) {
        R2100_1.val("");
    } else {
        R2100_1.val(total.toFixed(1));
    }




}