    if (values.CAP4_R400_C4 == ""
        && (values.CHESTIONAR_RA_C1 == true )) {
        webform.errors.push({
            'fieldName': 'CAP4_R400_C4',
            'msg': Drupal.t('Cod eroare: A.01, Cap.4 [r.400 c.2] >= 0')
        });
    }
