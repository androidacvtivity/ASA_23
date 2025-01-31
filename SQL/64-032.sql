SELECT
 D.RIND ||'-'||D.COL33||': nu ati introdus CUATM'

  AS REZULTAT

FROM
 CIS2.VW_DATA_ALL_TEMP D
         
WHERE
  (D.PERIOADA=:PERIOADA          ) AND
  (D.CUIIO=:CUIIO                ) AND
  (D.CUIIO_VERS=:CUIIO_VERS     OR :CUIIO_VERS = -1) AND
  (D.FORM = :FORM               ) AND
  (D.FORM_VERS=:FORM_VERS ) AND
  (D.CAPITOL=:CAPITOL           OR :CAPITOL = -1) AND
  (D.CAPITOL_VERS=:CAPITOL_VERS OR :CAPITOL_VERS = -1) AND
  (D.ID_MD=:ID_MD               OR :ID_MD = -1)AND 
  D.CAPITOL IN(1128) AND D.RIND NOT IN ('500')
  
GROUP BY
 D.RIND
  
  HAVING  
  
 
 (MAX(TO_CHAR(CASE WHEN D.CAPITOL IN(1128)  THEN D.COL33 END))) IS NULL 


--Modifica SQL 
-- Daca D.COL33 nu este din Lista CUATM sa 
--sa afiseze 'nu ati introdus CUATM corect '