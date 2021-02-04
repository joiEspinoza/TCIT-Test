

const clients = 
[

    { id: 1, taxNumber: '86620855', name: 'HECTOR ACUÑA BOLAÑOS'},
    { id: 2, taxNumber: '7317855K', name: 'JESUS RODRIGUEZ ALVAREZ'},
    { id: 3, taxNumber: '73826497', name: 'ANDRES NADAL MOLINA'},
    { id: 4, taxNumber: '88587715', name: 'SALVADOR ARNEDO MANRIQUEZ'},
    { id: 5, taxNumber: '94020190', name: 'VICTOR MANUEL ROJAS LUCAS'},
    { id: 6, taxNumber: '99804238', name: 'MOHAMED FERRE SAMPER' } 

];
  
  
const accounts = 
[

    { clientId: 6, bankId: 1, balance: 15000 },
    { clientId: 1, bankId: 3, balance: 18000 },
    { clientId: 5, bankId: 3, balance: 135000 },
    { clientId: 2, bankId: 2, balance: 5600 },
    { clientId: 3, bankId: 1, balance: 23000 },
    { clientId: 5, bankId: 2, balance: 15000 },
    { clientId: 3, bankId: 3, balance: 45900 },
    { clientId: 2, bankId: 3, balance: 19000 },
    { clientId: 4, bankId: 3, balance: 51000 },
    { clientId: 5, bankId: 1, balance: 89000 },
    { clientId: 1, bankId: 2, balance: 1600 },
    { clientId: 5, bankId: 3, balance: 37500 },
    { clientId: 6, bankId: 1, balance: 19200 },
    { clientId: 2, bankId: 3, balance: 10000 },
    { clientId: 3, bankId: 2, balance: 5400 },
    { clientId: 3, bankId: 1, balance: 9000 },
    { clientId: 4, bankId: 3, balance: 13500 },
    { clientId: 2, bankId: 1, balance: 38200 },
    { clientId: 5, bankId: 2, balance: 17000 },
    { clientId: 1, bankId: 3, balance: 1000 },
    { clientId: 5, bankId: 2, balance: 600 },
    { clientId: 6, bankId: 1, balance: 16200 },
    { clientId: 2, bankId: 2, balance: 10000 } 

];
  
 
const banks = 
[

    { id: 1, name: 'SANTANDER' },
    { id: 2, name: 'CHILE' },
    { id: 3, name: 'ESTADO' }

];


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


const join = ( accounts , clients , banks ) =>
{

    let join = [];

    accounts.map( ( account ) => 
    {

        clients.map( ( client ) => 
        {


            banks.map( ( bank ) => 
            {

                if( account.bankId === bank.id && account.clientId === client.id )
                {
                    join = 
                    [ 
                        ...join, 
                        { 

                            clientId : client.id, 
                            clientName : client.name, 
                            clientRut : client.taxNumber, 
                            accountBalance : account.balance, 
                            bankId : bank.id,
                            bankName : bank.name

                        } 
                    ];
                };

            });


        });

    });

    return join.sort( ( a,b ) => a.clientId - b.clientId );

};


const joinResult = join( accounts, clients, banks );


console.table( joinResult );


//---------------------------------------------------------------------------------


const helper = ( customeData ) =>
{

    return customeData.reduce( ( acu, element ) => 
    {

        const exist = acu.find( ( elementF ) => elementF[0] === element[0] );

        if( exist )
        {
            return acu.map( ( acuElement ) => 
            {

                if( acuElement[0] === element[0] )
                {

                    return [ element[0], element[1] + acuElement[1] ];

                };

                return acuElement;

            });

        };

        return [ ...acu, element ];

    },[]);

};


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


const listClientsIds = ( data ) =>
( data.map( ( element ) => element.id ) );
//-------------------------------------------------------| Pregunta 0


const listClientsIdsSortByTaxNumber = ( data ) =>
{

    data.sort( ( a, b ) => parseInt( a.taxNumber) - parseInt( b.taxNumber ) );
    return data.map( ( element ) => element.id );

};
//-------------------------------------------------------| Pregunta 1


const sortClientsTotalBalances = ( data ) =>
{

    let clientNB = [];


    data.map( ( element ) => 
    {

        clientNB.push( [ element.clientName, element.accountBalance ] );

    });


    return helper( clientNB ).sort( ( a, b ) => b[1] - a[1] );


};
//-------------------------------------------------------| Pregunta 2


const banksClientsTaxNumbers = ( data ) => 
{

   let bankClient = [];


   data.map( ( element ) => 
    {

        const exist = bankClient.find( ( elementF ) => elementF[0] === element.bankName );

        if( !exist )
        {
            bankClient.push( [ element.bankName , [  ] ] );
        };
        
   });


   data.map( ( elementB ) => 
   {

        bankClient.map( ( elementC ) => 
        {
            
            if( elementC[0] === elementB.bankName  )
            {
                elementC[1].push( elementB.clientRut );
            };

        });

   });
  

   bankClient.sort();

   
   return bankClient.map( ( elementD ) => ( { [ elementD[0] ] : [ ...new Set( elementD[1] ) ] } ) );

};
//-------------------------------------------------------| Pregunta 3


const richClientsBalances = ( data ) =>
{

    let santanderClients = [];


    data.map( ( element ) => 
    {

        if( element.bankName === 'SANTANDER' )
        {
            santanderClients.push( [ element.clientName, element.accountBalance ] )
        };

    });


    santanderClients = helper( santanderClients );

    
    return santanderClients.map( ( element ) => element[1] > 25000 && element ).sort( ( a, b ) => b[1] - a[1] );;

};
//-------------------------------------------------------| Pregunta 4


const banksRankingByTotalBalance = ( data ) =>
{

    let banksIdTotal = [];

    
    data.map( ( element ) => 
    {

        banksIdTotal.push( [ element.bankId, element.accountBalance ] );

    });


    return helper( banksIdTotal ).sort( ( a, b ) => a[1] - b[1] );

};
//-------------------------------------------------------| Pregunta 5


const banksFidelity = ( data ) =>
{

    let bankNC = [];


    banksClientsTaxNumbers( data ).map( ( element ) => 
    {

        Object.entries( element ).map( ( elementB ) => 
        {

            bankNC.push( { [ elementB[0] ] : elementB[1].length } );

        });

    });


    return bankNC;

};
//-------------------------------------------------------| Pregunta 6


const banksPoorClients = ( data ) =>
{

    let bankClientC = [];
    let bankClientE = [];
    let bankClientS = [];
 

    data.map( ( element ) => 
    {

        if( element.bankName === 'CHILE' )
        {
            bankClientC.push( [ element.clientId, element.bankName, element.accountBalance ] );
        };


        if( element.bankName === 'ESTADO' )
        {
            bankClientE.push( [ element.clientId, element.bankName, element.accountBalance ] );
        };


        if( element.bankName === 'SANTANDER' )
        {
            bankClientS.push( [ element.clientId, element.bankName, element.accountBalance ] );
        };


    });


    const poorCustomer = ( bankData ) => 
    {

        const result = bankData.reduce( ( acu, elementR ) => acu < elementR ? acu : elementR  );
        
        return { [ result[1] ] : result[0] };

    };


    return [ poorCustomer( bankClientC ), poorCustomer( bankClientE ), poorCustomer( bankClientS ) ];

};
//-------------------------------------------------------| Pregunta 7


const newClientRanking = ( clients, accounts, banks ) =>
{

    const newClient = { id: 7, taxNumber: '99999999', name: 'SUPER TEST MAN' };
    const newAccount = { clientId: 7, bankId: 3, balance: 9000 };

    newClients = [ ...clients, newClient ];
    newAccounts = [ ...accounts, newAccount ];

    const newDataJoin = join( newAccounts, newClients, banks );

    return sortClientsTotalBalances( newDataJoin );

};
//-------------------------------------------------------| Pregunta 8


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

 
console.log( 'Pregunta 0' );
console.log( listClientsIds( clients ) );

console.log( 'Pregunta 1' );
console.log( listClientsIdsSortByTaxNumber( clients ) );

console.log( 'Pregunta 2' );
console.log( sortClientsTotalBalances( joinResult ) );

console.log( 'Pregunta 3' );
console.log( banksClientsTaxNumbers( joinResult ) );

console.log( 'Pregunta 4' );
console.log( richClientsBalances( joinResult ) );

console.log( 'Pregunta 5' );
console.log( banksRankingByTotalBalance( joinResult ) );

console.log( 'Pregunta 6' );
console.log( banksFidelity( joinResult ) );

console.log( 'Pregunta 7' );
console.log( banksPoorClients( joinResult ) );

console.log( 'Pregunta 8' );
console.log( newClientRanking( clients, accounts, banks ) );



