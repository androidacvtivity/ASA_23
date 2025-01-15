/* Formatted on 1/14/2025 6:08:33 PM (QP5 v5.391) */
SELECT    (  CIS2.NVAL (
                 SUM (
                     CASE
                         WHEN     D.RIND IN ('150', '160', '170')
                              AND D.CAPITOL IN (1124)
                         THEN
                             CIS2.NVAL (D.COL1)
                         ELSE
                             NULL
                     END))
           - CIS2.NVAL (
                 SUM (
                     CASE
                         WHEN D.RIND IN ('200') AND D.CAPITOL IN (1125)
                         THEN
                             CIS2.NVAL (D.COL1)
                         ELSE
                             NULL
                     END))
           + CIS2.NVAL (
                 SUM (
                     CASE
                         WHEN     D.RIND IN ('330', '340')
                              AND D.CAPITOL IN (1126)
                         THEN
                             CIS2.NVAL (D.COL2) - CIS2.NVAL (D.COL1)
                         ELSE
                             NULL
                     END))
           - CIS2.NVAL (
                 SUM (
                     CASE
                         WHEN D.RIND IN ('220') AND D.CAPITOL IN (1125)
                         THEN
                             CIS2.NVAL (D.COL1)
                         ELSE
                             NULL
                     END))
           - CIS2.NVAL (
                 SUM (
                     CASE
                         WHEN D.RIND IN ('240') AND D.CAPITOL IN (1125)
                         THEN
                             CIS2.NVAL (D.COL1)
                         ELSE
                             NULL
                     END))
           - CIS2.NVAL (
                 SUM (
                     CASE
                         WHEN D.RIND IN ('290') AND D.CAPITOL IN (1125)
                         THEN
                             CIS2.NVAL (D.COL1)
                         ELSE
                             NULL
                     END))
           + CIS2.NVAL (
                 SUM (
                     CASE
                         WHEN D.RIND IN ('180') AND D.CAPITOL IN (1124)
                         THEN
                             CIS2.NVAL (D.COL1)
                         ELSE
                             NULL
                     END)))
       || ' < 0'    AS REZULTAT
  FROM CIS2.VW_DATA_ALL_TEMP D
 WHERE     (D.PERIOADA = :PERIOADA)
       AND (D.CUIIO = :CUIIO)
       AND (D.CUIIO_VERS = :CUIIO_VERS OR :CUIIO_VERS = -1)
       AND (D.FORM = :FORM)
       AND (D.FORM_VERS = :FORM_VERS)
       AND (D.CAPITOL = :CAPITOL OR :CAPITOL = -1)
       AND (D.CAPITOL_VERS = :CAPITOL_VERS OR :CAPITOL_VERS = -1)
       AND (D.ID_MD = :ID_MD OR :ID_MD = -1)
       AND D.FORM IN (64)
HAVING (  CIS2.NVAL (
              SUM (
                  CASE
                      WHEN     D.RIND IN ('150', '160', '170')
                           AND D.CAPITOL IN (1124)
                      THEN
                          CIS2.NVAL (D.COL1)
                      ELSE
                          NULL
                  END))
        - CIS2.NVAL (
              SUM (
                  CASE
                      WHEN D.RIND IN ('200') AND D.CAPITOL IN (1125)
                      THEN
                          CIS2.NVAL (D.COL1)
                      ELSE
                          NULL
                  END))
        + CIS2.NVAL (
              SUM (
                  CASE
                      WHEN D.RIND IN ('330', '340') AND D.CAPITOL IN (1126)
                      THEN
                          CIS2.NVAL (D.COL2) - CIS2.NVAL (D.COL1)
                      ELSE
                          NULL
                  END))
        - CIS2.NVAL (
              SUM (
                  CASE
                      WHEN D.RIND IN ('220') AND D.CAPITOL IN (1125)
                      THEN
                          CIS2.NVAL (D.COL1)
                      ELSE
                          NULL
                  END))
        - CIS2.NVAL (
              SUM (
                  CASE
                      WHEN D.RIND IN ('240') AND D.CAPITOL IN (1125)
                      THEN
                          CIS2.NVAL (D.COL1)
                      ELSE
                          NULL
                  END))
        - CIS2.NVAL (
              SUM (
                  CASE
                      WHEN D.RIND IN ('290') AND D.CAPITOL IN (1125)
                      THEN
                          CIS2.NVAL (D.COL1)
                      ELSE
                          NULL
                  END))
        + CIS2.NVAL (
              SUM (
                  CASE
                      WHEN D.RIND IN ('180') AND D.CAPITOL IN (1124)
                      THEN
                          CIS2.NVAL (D.COL1)
                      ELSE
                          NULL
                  END))) <
       0