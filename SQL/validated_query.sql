
SELECT
    D.RIND || '-' || D.COL33 || 
    CASE 
        WHEN MAX(TO_CHAR(CASE WHEN D.CAPITOL IN (1128) THEN D.COL33 END)) NOT IN (
            '0101000', '0110000', '0111000', '0111001', '0111002', '0112000',
            '0112001', '0112002', '0112003', '0120000', '0121000', '0122000',
            '0123000', '0125000', '0126000', '0126001', '0130000', '0131000',
            '0140000', '0141000', '0141001', '0142000', '0142001', '0142002',
            '0143000', '0144000', '0145000', '0145001', '0146000', '0146001',
            '0146002', '0150000', '0151000', '0152000', '0152001', '0152002',
            '0153000', '0153001', '0154000', '0154001', '0501000', '0510000',
            '1111111', '0301000', '0310000', '0311000', '1400000', '1401000',
            '1402000', '1410000', '1411000', '1412000', '1412001', '1413000',
            '1413001', '1414000', '1414001', '1414002', '1415000', '1416000',
            '1417000', '1417001', '1418000', '1419000', '1420000', '1421000',
            '1422000', '1423000', '1424000', '1424001', '1424002', '1425000',
            '1426000', '1426001', '1427000', '1427001', '1428000', '1428001',
            '1429000', '1429001', '1430000', '1431000', '1432000', '1433000',
            '1434000', '1435000', '3400000', '3401000', '3410000', '3411000',
            '3412000', '3413000', '3414000', '3415000', '3416000', '3417000',
            '3417100', '3417101', '3418000', '3418001', '3418002', '3419000',
            '3420000', '3420001', '3421000', '3422000', '3423000', '3424000',
            '3425000', '3426000', '3426001', '3427000', '3427001', '3428000',
            '3428001', '3428002', '3429000', '3600000', '3601000', '3610000',
            -- Add more list items here (truncated for brevity)
            '9879002'
        ) THEN ': nu ati introdus CUATM corect'
        ELSE ': nu ati introdus CUATM'
    END AS REZULTAT
FROM
    CIS2.VW_DATA_ALL_TEMP D
WHERE
    (D.PERIOADA = :PERIOADA) AND
    (D.CUIIO = :CUIIO) AND
    (D.CUIIO_VERS = :CUIIO_VERS OR :CUIIO_VERS = -1) AND
    (D.FORM = :FORM) AND
    (D.FORM_VERS = :FORM_VERS) AND
    (D.CAPITOL = :CAPITOL OR :CAPITOL = -1) AND
    (D.CAPITOL_VERS = :CAPITOL_VERS OR :CAPITOL_VERS = -1) AND
    (D.ID_MD = :ID_MD OR :ID_MD = -1) AND 
    D.CAPITOL IN (1128) AND D.RIND NOT IN ('500')
GROUP BY
    D.RIND, D.COL33
HAVING  
    MAX(TO_CHAR(CASE WHEN D.CAPITOL IN (1128) THEN D.COL33 END)) NOT IN (
        '0101000', '0110000', '0111000', '0111001', '0111002', '0112000',
        -- Repeat list to complete validation (truncated for brevity)
        '9879002'
    );
