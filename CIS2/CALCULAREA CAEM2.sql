SELECT 
      CASE WHEN :pCUIIO IN (37662996) THEN '4730' ELSE CAEM END AS CAEM,VAL_00_0_0,VAL_XX_0_0,VAL_XX_X_0,VAL_XX_X_X,NUM
    FROM
    (
      SELECT
        L4.CAEM AS CAEM,
        L1.VAL/DECODE(L1.VAL,0,NULL,L1.VAL)*100 AS VAL_00_0_0,
        L2.VAL/DECODE(L1.VAL,0,NULL,L1.VAL)*100 AS VAL_XX_0_0,
        L3.VAL/DECODE(L1.VAL,0,NULL,L1.VAL)*100 AS VAL_XX_X_0,
        L4.VAL/DECODE(L1.VAL,0,NULL,L1.VAL)*100 AS VAL_XX_X_X,
        L4.NUM AS NUM
      FROM
      (
        SELECT
          AGR_LEVEL,
          CAEM,
          MAX(VAL) AS VAL,
          MAX(NUM) AS NUM
        FROM
        (
        
        SELECT 1 AS AGR_LEVEL, '0000' AS CAEM, SUBSTR(C.CODUL,1,1),
                      SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                   SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                 (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                  TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL,
                      SUM(D.COL4) AS NUM
               FROM   VW_DATA_ALL D 
                  INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000'))
               WHERE D.PERIOADA = :pPERIOADA AND 
                  D.CUIIO = :pCUIIO AND 
                  D.FORM = :pFORM AND
                  D.CAPITOL IN (1127) AND
                  D.COL31 IS NOT NULL
               GROUP BY
                 SUBSTR(C.CODUL,1,1)
        )
        GROUP BY
          AGR_LEVEL,
          CAEM  
      ) L1,


      (
        SELECT
          AGR_LEVEL,
          CAEM,
          MAX(VAL) AS VAL,
          MAX(NUM) AS NUM
        FROM
        (
        SELECT 2 AS AGR_LEVEL, SUBSTR(C.CODUL,2,2)||'00' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER,
                              SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                   SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                 (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                  TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL,
                              SUM(D.COL4) AS NUM
                       FROM   VW_DATA_ALL D 
                              INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                       WHERE   
                         D.PERIOADA = :pPERIOADA AND 
                         D.CUIIO = :pCUIIO AND 
                         D.FORM = :pFORM AND
                         D.CAPITOL IN (1127) AND
                         D.COL31 IS NOT NULL AND
                        SUBSTR(C.CODUL,2,2)||'00' IN (  SELECT
--                                              A.AGR_LEVEL,
                                              A.CAEM
--                                              A.VAL,
--                                              A.NUM
                                            FROM
                                            (SELECT 2 AS AGR_LEVEL, SUBSTR(C.CODUL,2,2)||'00' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER,
                                                      SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                           SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                         (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                          TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL,
                                                      SUM(D.COL4) AS NUM
                                               FROM  VW_DATA_ALL D 
                                                     INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                               WHERE   
                                                  D.PERIOADA = :pPERIOADA AND 
                                                  D.CUIIO = :pCUIIO AND 
                                                  D.FORM = :pFORM AND
                                                  D.CAPITOL IN (1127) AND
                                                  D.COL31 IS NOT NULL
                                               GROUP BY SUBSTR(C.CODUL,2,2)||'00',SUBSTR(C.CODUL,1,1)
                                            ) A
                                                INNER JOIN
                                                (SELECT
                                              MAX(VAL) AS VAL,
                                              MAX(NUM) AS NUM
                                            FROM
                                            (
                                            SELECT 2 AS AGR_LEVEL, SUBSTR(C.CODUL,2,2)||'00' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER,
                                                                  SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                                       SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                                     (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                                      TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
                                                                  SUM(D.COL4) AS NUM
                                                   FROM   
                                                      VW_DATA_ALL D 
                                                      INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                                   WHERE  D.PERIOADA = :pPERIOADA AND 
                                                          D.CUIIO = :pCUIIO AND 
                                                          D.FORM = :pFORM AND
                                                          D.CAPITOL IN (1127) AND
                                                          D.COL31 IS NOT NULL AND
                                                        SUBSTR(C.CODUL,1,1) IN (SELECT
                                                                      A.LETTER
                                                                      
                                                                    FROM
                                                                    (SELECT 1 AS AGR_LEVEL, '0000' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER, 
                                                                          SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                                               SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                                             (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                                              TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
                                                                          SUM(D.COL4) AS NUM
                                                                       FROM   
                                                                          VW_DATA_ALL D 
                                                                          INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                                                       WHERE  
                                                                          D.PERIOADA = :pPERIOADA AND 
                                                                          D.CUIIO = :pCUIIO AND 
                                                                          D.FORM = :pFORM AND
                                                                          D.CAPITOL IN (1127) AND
                                                                          D.COL31 IS NOT NULL
                                                                       GROUP BY
                                                                         SUBSTR(C.CODUL,1,1) ) A
                                                                    INNER JOIN
                                                                    (SELECT
                                                                      AGR_LEVEL,
                                                                      CAEM,
                                                                      MAX(VAL) AS VAL,
                                                                      MAX(NUM) AS NUM
                                                                    FROM
                                                                    (SELECT 1 AS AGR_LEVEL, '0000' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER, 
                                                                          SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                                               SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                                             (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                                              TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
                                                                          SUM(D.COL4) AS NUM
                                                                       FROM   
                                                                          VW_DATA_ALL D 
                                                                          INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                                                       WHERE  
                                                                          D.PERIOADA = :pPERIOADA AND 
                                                                          D.CUIIO = :pCUIIO AND 
                                                                          D.FORM = :pFORM AND
                                                                          D.CAPITOL IN (1127) AND
                                                                          D.COL31 IS NOT NULL
                                                                       GROUP BY
                                                                         SUBSTR(C.CODUL,1,1) 
                                                                    )
                                                                    GROUP BY
                                                                      AGR_LEVEL,
                                                                      CAEM)B ON A.VAL=B.VAL)
                                                   GROUP BY SUBSTR(C.CODUL,2,2)||'00',SUBSTR(C.CODUL,1,1)
                                            ))B ON A.VAL=B.VAL)
           GROUP BY SUBSTR(C.CODUL,2,2)||'00',SUBSTR(C.CODUL,1,1)
        )
        GROUP BY
          AGR_LEVEL,
          CAEM
      ) L2,


      (
        SELECT
          A.AGR_LEVEL,
          A.CAEM,
          A.VAL,
          A.NUM
        FROM
        (SELECT 3 AS AGR_LEVEL, SUBSTR(C.CODUL,2,3)||'0' AS CAEM, 
                  SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                   SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                 (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                  TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL,
                  SUM(D.COL4) AS NUM
           FROM   VW_DATA_ALL D 
                  INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
           WHERE  D.PERIOADA = :pPERIOADA AND 
                  D.CUIIO = :pCUIIO AND 
                  D.FORM = :pFORM AND
                  D.CAPITOL IN (1127) AND
                  D.COL31 IS NOT NULL
           GROUP BY SUBSTR(C.CODUL,2,3)||'0'
        ) A
            INNER JOIN
            (SELECT
          MAX(VAL) AS VAL,
          MAX(NUM) AS NUM
        FROM
        (
        SELECT 2 AS AGR_LEVEL, SUBSTR(C.CODUL,2,3)||'0' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER,
                              SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                   SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                 (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                  TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL,
                              SUM(D.COL4) AS NUM
                       FROM   VW_DATA_ALL D 
                              INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                       WHERE   
                         D.PERIOADA = :pPERIOADA AND 
                         D.CUIIO = :pCUIIO AND 
                         D.FORM = :pFORM AND
                         D.CAPITOL IN (1127) AND
                         D.COL31 IS NOT NULL AND
                        SUBSTR(C.CODUL,2,2)||'00' IN (  SELECT
--                                              A.AGR_LEVEL,
                                              A.CAEM
--                                              A.VAL,
--                                              A.NUM
                                            FROM
                                            (SELECT 2 AS AGR_LEVEL, SUBSTR(C.CODUL,2,2)||'00' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER,
                                                      SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                           SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                         (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                          TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL,
                                                      SUM(D.COL4) AS NUM
                                               FROM  VW_DATA_ALL D 
                                                     INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                               WHERE   
                                                  D.PERIOADA = :pPERIOADA AND 
                                                  D.CUIIO = :pCUIIO AND 
                                                  D.FORM = :pFORM AND
                                                  D.CAPITOL IN (1127) AND
                                                  D.COL31 IS NOT NULL
                                               GROUP BY SUBSTR(C.CODUL,2,2)||'00',SUBSTR(C.CODUL,1,1)
                                            ) A
                                                INNER JOIN
                                                (SELECT
                                              MAX(VAL) AS VAL,
                                              MAX(NUM) AS NUM
                                            FROM
                                            (
                                            SELECT 2 AS AGR_LEVEL, SUBSTR(C.CODUL,2,2)||'00' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER,
                                                                  SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                                       SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                                     (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                                      TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
                                                                  SUM(D.COL4) AS NUM
                                                   FROM   
                                                      VW_DATA_ALL D 
                                                      INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                                   WHERE  D.PERIOADA = :pPERIOADA AND 
                                                          D.CUIIO = :pCUIIO AND 
                                                          D.FORM = :pFORM AND
                                                          D.CAPITOL IN (1127) AND
                                                          D.COL31 IS NOT NULL AND
                                                        SUBSTR(C.CODUL,1,1) IN (SELECT
                                                                      A.LETTER
                                                                      
                                                                    FROM
                                                                    (SELECT 1 AS AGR_LEVEL, '0000' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER, 
                                                                          SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                                               SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                                             (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                                              TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
                                                                          SUM(D.COL4) AS NUM
                                                                       FROM   
                                                                          VW_DATA_ALL D 
                                                                          INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                                                       WHERE  
                                                                          D.PERIOADA = :pPERIOADA AND 
                                                                          D.CUIIO = :pCUIIO AND 
                                                                          D.FORM = :pFORM AND
                                                                          D.CAPITOL IN (1127) AND
                                                                          D.COL31 IS NOT NULL
                                                                       GROUP BY
                                                                         SUBSTR(C.CODUL,1,1) ) A
                                                                    INNER JOIN
                                                                    (SELECT
                                                                      AGR_LEVEL,
                                                                      CAEM,
                                                                      MAX(VAL) AS VAL,
                                                                      MAX(NUM) AS NUM
                                                                    FROM
                                                                    (SELECT 1 AS AGR_LEVEL, '0000' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER, 
                                                                          SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                                               SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                                             (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                                              TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
                                                                          SUM(D.COL4) AS NUM
                                                                       FROM   
                                                                          VW_DATA_ALL D 
                                                                          INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                                                       WHERE  
                                                                          D.PERIOADA = :pPERIOADA AND 
                                                                          D.CUIIO = :pCUIIO AND 
                                                                          D.FORM = :pFORM AND
                                                                          D.CAPITOL IN (1127) AND
                                                                          D.COL31 IS NOT NULL
                                                                       GROUP BY
                                                                         SUBSTR(C.CODUL,1,1) 
                                                                    )
                                                                    GROUP BY
                                                                      AGR_LEVEL,
                                                                      CAEM)B ON A.VAL=B.VAL)
                                                   GROUP BY SUBSTR(C.CODUL,2,2)||'00',SUBSTR(C.CODUL,1,1)
                                            ))B ON A.VAL=B.VAL)
           GROUP BY SUBSTR(C.CODUL,2,3)||'0',SUBSTR(C.CODUL,1,1)
        ))B ON A.VAL=B.VAL 
      ) L3,


      (    SELECT
      A.AGR_LEVEL,
      A.CAEM,
      A.VAL,
      A.NUM
    FROM
    (SELECT 4 AS AGR_LEVEL, SUBSTR(C.CODUL,2,4) AS CAEM, 
      SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                           SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                         (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                          TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
      SUM(D.COL4) AS NUM
    FROM   
      VW_DATA_ALL D 
      INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
    WHERE  
      D.PERIOADA = :pPERIOADA AND 
      D.CUIIO = :pCUIIO AND 
      D.FORM = :pFORM AND
      D.CAPITOL IN (1127) AND
      D.RIND NOT IN ('400') AND
      D.COL31 IS NOT NULL
    GROUP BY 
      C.CODUL
    ) A
        INNER JOIN
        (
    
    SELECT
--      A.AGR_LEVEL,
--      A.CAEM,
      MAX(A.VAL) AS VAL,
      MAX(A.NUM) AS NUM
    FROM
    (SELECT 4 AS AGR_LEVEL, SUBSTR(C.CODUL,2,4) AS CAEM, 
          SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                               SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                             (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                              TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
          SUM(D.COL4) AS NUM
        FROM   
          VW_DATA_ALL D 
          INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
        WHERE  
          D.PERIOADA = :pPERIOADA AND 
          D.CUIIO = :pCUIIO AND 
          D.FORM = :pFORM AND
          D.CAPITOL IN (1127) AND
          D.RIND NOT IN ('400') AND
          D.COL31 IS NOT NULL
        GROUP BY 
          C.CODUL
    ) A
        INNER JOIN
        (SELECT
          A.AGR_LEVEL,
          A.CAEM,
          A.VAL,
          A.NUM
        FROM
        (SELECT 
              3 AS AGR_LEVEL, SUBSTR(C.CODUL,2,3)||'0' AS CAEM,
              SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
              SUM(D.COL4) AS NUM
            FROM   
              VW_DATA_ALL D 
              INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
            WHERE  
              D.PERIOADA = :pPERIOADA AND 
              D.CUIIO = :pCUIIO AND 
              D.FORM = :pFORM AND
              D.CAPITOL IN (1127) AND
            --  D.RIND NOT IN ('400') AND
              D.COL31 IS NOT NULL
            GROUP BY 
              SUBSTR(C.CODUL,2,3)||'0'
        ) A
            INNER JOIN
            (SELECT
                  MAX(VAL) AS VAL,
                  MAX(NUM) AS NUM
                FROM
                (
                SELECT 2 AS AGR_LEVEL, SUBSTR(C.CODUL,2,3)||'0' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER,
                              SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                   SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                 (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                  TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL,
                              SUM(D.COL4) AS NUM
                       FROM   VW_DATA_ALL D 
                              INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                       WHERE   
                         D.PERIOADA = :pPERIOADA AND 
                         D.CUIIO = :pCUIIO AND 
                         D.FORM = :pFORM AND
                         D.CAPITOL IN (1127) AND
                         D.COL31 IS NOT NULL AND
                        SUBSTR(C.CODUL,2,2)||'00' IN (  SELECT
--                                              A.AGR_LEVEL,
                                              A.CAEM
--                                              A.VAL,
--                                              A.NUM
                                            FROM
                                            (SELECT 2 AS AGR_LEVEL, SUBSTR(C.CODUL,2,2)||'00' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER,
                                                      SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                           SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                         (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                          TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL,
                                                      SUM(D.COL4) AS NUM
                                               FROM  VW_DATA_ALL D 
                                                     INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                               WHERE   
                                                  D.PERIOADA = :pPERIOADA AND 
                                                  D.CUIIO = :pCUIIO AND 
                                                  D.FORM = :pFORM AND
                                                  D.CAPITOL IN (1127) AND
                                                  D.COL31 IS NOT NULL
                                               GROUP BY SUBSTR(C.CODUL,2,2)||'00',SUBSTR(C.CODUL,1,1)
                                            ) A
                                                INNER JOIN
                                                (SELECT
                                              MAX(VAL) AS VAL,
                                              MAX(NUM) AS NUM
                                            FROM
                                            (
                                            SELECT 2 AS AGR_LEVEL, SUBSTR(C.CODUL,2,2)||'00' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER,
                                                                  SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                                       SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                                     (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                                      TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
                                                                  SUM(D.COL4) AS NUM
                                                   FROM   
                                                      VW_DATA_ALL D 
                                                      INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                                   WHERE  D.PERIOADA = :pPERIOADA AND 
                                                          D.CUIIO = :pCUIIO AND 
                                                          D.FORM = :pFORM AND
                                                          D.CAPITOL IN (1127) AND
                                                          D.COL31 IS NOT NULL AND
                                                        SUBSTR(C.CODUL,1,1) IN (SELECT
                                                                      A.LETTER
                                                                      
                                                                    FROM
                                                                    (SELECT 1 AS AGR_LEVEL, '0000' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER, 
                                                                          SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                                               SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                                             (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                                              TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
                                                                          SUM(D.COL4) AS NUM
                                                                       FROM   
                                                                          VW_DATA_ALL D 
                                                                          INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                                                       WHERE  
                                                                          D.PERIOADA = :pPERIOADA AND 
                                                                          D.CUIIO = :pCUIIO AND 
                                                                          D.FORM = :pFORM AND
                                                                          D.CAPITOL IN (1127) AND
                                                                          D.COL31 IS NOT NULL
                                                                       GROUP BY
                                                                         SUBSTR(C.CODUL,1,1) ) A
                                                                    INNER JOIN
                                                                    (SELECT
                                                                      AGR_LEVEL,
                                                                      CAEM,
                                                                      MAX(VAL) AS VAL,
                                                                      MAX(NUM) AS NUM
                                                                    FROM
                                                                    (SELECT 1 AS AGR_LEVEL, '0000' AS CAEM, SUBSTR(C.CODUL,1,1) AS LETTER, 
                                                                          SUM(D.COL3/(CASE WHEN SUBSTR(D.COL31,1,2) IN('45', '46', '47') AND 
                                                                                               SUBSTR(D.COL31,1,4) NOT IN('4520') AND
                                                                                             (TO_NUMBER(SUBSTR(D.COL31,1,4)) < 4611 OR 
                                                                                              TO_NUMBER(SUBSTR(D.COL31,1,4)) > 4619) THEN 3 ELSE 1 END)) AS VAL, 
                                                                          SUM(D.COL4) AS NUM
                                                                       FROM   
                                                                          VW_DATA_ALL D 
                                                                          INNER JOIN CL_CAEM2 C ON(TO_CHAR(D.COL31,'0000')=TO_CHAR(SUBSTR(C.CODUL,2,4),'0000')) 
                                                                       WHERE  
                                                                          D.PERIOADA = :pPERIOADA AND 
                                                                          D.CUIIO = :pCUIIO AND 
                                                                          D.FORM = :pFORM AND
                                                                          D.CAPITOL IN (1127) AND
                                                                          D.COL31 IS NOT NULL
                                                                       GROUP BY
                                                                         SUBSTR(C.CODUL,1,1) 
                                                                    )
                                                                    GROUP BY
                                                                      AGR_LEVEL,
                                                                      CAEM)B ON A.VAL=B.VAL)
                                                   GROUP BY SUBSTR(C.CODUL,2,2)||'00',SUBSTR(C.CODUL,1,1)
                                            ))B ON A.VAL=B.VAL)
           GROUP BY SUBSTR(C.CODUL,2,3)||'0',SUBSTR(C.CODUL,1,1)
    ))B ON A.VAL=B.VAL)B ON SUBSTR(A.CAEM,1,3)||'0'=SUBSTR(B.CAEM,1,3)||'0'
)B ON A.VAL=B.VAL
      
      ) L4
    
      WHERE
        L2.CAEM=SUBSTR(L3.CAEM,1,2)||'00' AND
        L3.CAEM=SUBSTR(L4.CAEM,1,3)||'0'
    )
    ORDER BY
      DECODE(VAL_00_0_0,NULL,0,VAL_00_0_0) DESC,
      DECODE(VAL_XX_0_0,NULL,0,VAL_XX_0_0) DESC,
      DECODE(VAL_XX_X_0,NULL,0,VAL_XX_X_0) DESC,
      DECODE(VAL_XX_X_X,NULL,0,VAL_XX_X_X) DESC,
      DECODE(NUM,NULL,0,NUM) DESC