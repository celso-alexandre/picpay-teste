config_file=/config/inadyn.conf

appStart () {

    inadyn --input_file $config_file

}

if [ ! -f $config_file ]; then

    echo "update_period_sec 600" > $config_file
    echo "username ${USERNAME}" >> $config_file
    echo "password ${PASSWORD}" >> $config_file
    
    if [ -z "$SYSTEM" ]; then

        echo "system default@dyndns.org" >> $config_file

    else

        echo "system ${SYSTEM}" >> $config_file

    fi

    echo "alias ${ALIAS}" >> $config_file

    appStart

else

    appStart

fi
