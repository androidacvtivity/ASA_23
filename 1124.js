var from = "";

$(document).ready(function () {
    form = $("#formDenShort").val();
    fASA_CAP1();
});

$(function () {
    // OnKeyPress 
    $("input:not([type='button']):not([readonly]):not([disabled])").on("change", function (e) {
        fASA_CAP1();
    });
});
function fASA_CAP1() {

    var R100_C1 = $("#64_1124_58733_100_1"); //64_1124_58733_100_1  - 2022
    var R110_C1 = $("#64_1124_58734_110_1"); //64_1124_58734_110_1
    var R111_C1 = $("#64_1124_58735_111_1"); //64_1124_58735_111_1
    var R112_C1 = $("#64_1124_58736_112_1"); //64_1124_58736_112_1
    var R120_C1 = $("#64_1124_77324_120_1"); //64_1124_77324_120_1  - 2023
    var R121_C1 = $("#64_1124_58738_121_1"); //64_1124_58738_121_1
    var R122_C1 = $("#64_1124_58739_122_1"); //64_1124_58739_122_1
    var R130_C1 = $("#64_1124_58740_130_1"); //64_1124_58740_130_1
    var R140_C1 = $("#64_1124_58741_140_1"); //64_1124_58741_140_1
    var R150_C1 = $("#64_1124_58742_150_1"); //64_1124_58742_150_1  64_1124_58742_150_1
    var R151_C1 = $("#64_1124_58743_151_1"); //64_1124_58743_151_1



    //--------------readOnly input -----------------------
    R110_C1.prop("readonly", true);
    R120_C1.prop("readonly", true);
    R150_C1.prop("readonly", true);


    //--------------------------------------------------------------------------------------------
    //-------------------------------Rind 110------------------------------------------------------ 

// //Modify the js code.
// //If the result is zero, do not display zero, display nothing. (NULL)

//     R110_C1.val((parseFloat(Number(R111_C1.val()).toFixed(1)) + parseFloat(Number(R112_C1.val()).toFixed(1))).toFixed(1));

//     //--------------------------------------------------------------------------------------------
//     //-------------------------------Rind 120------------------------------------------------------

//     R120_C1.val((parseFloat(Number(R121_C1.val()).toFixed(1)) + parseFloat(Number(R122_C1.val()).toFixed(1))).toFixed(1));

//     //--------------------------------------------------------------------------------------------
//     //-------------------------------Rind 150------------------------------------------------------

//     R150_C1.val((parseFloat(Number(R100_C1.val()).toFixed(1))
//         + parseFloat(Number(R110_C1.val()).toFixed(1))
//         + parseFloat(Number(R120_C1.val()).toFixed(1))
//         + parseFloat(Number(R130_C1.val()).toFixed(1))
//         + parseFloat(Number(R140_C1.val()).toFixed(1))).toFixed(1));

    // Modify R110

    //This work 
    let r110Result = (parseFloat(Number(R111_C1.val()).toFixed(1)) + parseFloat(Number(R112_C1.val()).toFixed(1))).toFixed(1);
    R110_C1.val(r110Result == 0 ? null : r110Result);

    //--------------------------------------------------------------------------------------------
    //-------------------------------Rind 120------------------------------------------------------

    let r120Result = (parseFloat(Number(R121_C1.val()).toFixed(1)) + parseFloat(Number(R122_C1.val()).toFixed(1))).toFixed(1);
    R120_C1.val(r120Result == 0 ? null : r120Result);

    //--------------------------------------------------------------------------------------------
    //-------------------------------Rind 150------------------------------------------------------

    let r150Result = (
        parseFloat(Number(R100_C1.val()).toFixed(1)) +
        parseFloat(Number(R110_C1.val()).toFixed(1)) +
        parseFloat(Number(R120_C1.val()).toFixed(1)) +
        parseFloat(Number(R130_C1.val()).toFixed(1)) +
        parseFloat(Number(R140_C1.val()).toFixed(1))
    ).toFixed(1);
    R150_C1.val(r150Result == 0 ? null : r150Result);




}