
//------------this is a test data object--------------
export let storageObj = {
    storeReady:false,
    packagesList: [
        {
            duration: '1 Day',
            price:'1000/='
        },
        {
            duration: '3 Days',
            price: '2500/='
        },
        {
            duration: '7 Days',
            price: '5000/='
        },
        {
            duration: '14 Days',
            price: '9000/='
        },
        {
            duration: '30 Days',
            price: '18000/='
        }

    ],
    defaultVoucherCode: '2345',
    availableRunningCodes: [
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${1000}`,
            clientID: 'xyzopIKhO98JKKLL',
            routerIP: '192.168.1.1',
        }
        , {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${2500}`,
            clientID: 'xyzopIKhO98JKKLL',
            routerIP: '192.168.1.1',
        },
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${2500}`,
            clientID: 'xyzopIKhO98JKKLL',
            routerIP: '192.168.1.1',
        },
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${1000}`,
            clientID: 'xyzopIKhO98JKKLL',
            routerIP: '192.168.1.2',
        },
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${1000}`,
            clientID: 'xyzopIKhO98JKKLL',
            routerIP: '192.168.1.2',
        },
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${1000}`,
            clientID: 'xyzopIKhO98JKKLL'
        },
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${1000}`,
            clientID: 'xyzopIKhO98JKKLL'
        },
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${5000}`,
            clientID: 'xyzopIKhO98JKKLL'
        },
         {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${5000}`,
            clientID: 'xyzopIKhO98JKKLL'
        }
        ,
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${9000}`,
            clientID: 'xyzopIKhO98JKKLL'
        },
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${18000}`,
            clientID: 'xyzopIKhO98JKKLL',
        }
        ,
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${18000}`,
            clientID: 'xyzopIKhO98JKKLL'
        },
        {
            code: 'WE234',
            status: 'access granted',
            remainingTime: '5Hrs',
            phoneNumber: '0740536339',
            payment: `ugx.${18000}`,
            clientID: 'xyzopIKhO98JKKLL'
        }
    ],
    admin: {
        adminID:'XFMRBEJZCN',
      username:'delos',
      email: 'delos@gmail.com',
        lastLoggedIn: '2-03-25',
        phoneNumber: '+256741882818'
    },
    clientTimeFrames: ['1-HR','6-HRS','12-HRS','24-HRS','48-HRS(2Days)','72-HRS(3Days)','1-week','1-month'],
    graphData: [],
    merchantCode: '542388888',
    routersInfo: [
        {
            routerIP: '192.168.1.1',
            isActive: true,
            name: 'kavule router',
            holderContact: '077918182',
            connections: '3',
            lastUpdated:'12:33:43 6-04-25'
        },
        {
            routerIP: '192.168.1.2',
            isActive: true,
            name: 'town router',
            holderContact: '077921182',
            connections: '3',
            lastUpdated: '12:33:43 6-04-25'
        },
        {
            routerIP: '192.168.1.3',
            isActive: false,
            name: 'kitintale router',
            holderContact: '077934182',
            connections: '3',
            lastUpdated: '12:33:43 6-04-25'
        },
    ]
}



export const reducerFunction = (state = storageObj,action) => {
    switch (action.type) {

        case 'HYDRATE_STATE':
            return {
              ...state,
              ...action.payload
            };
          
          

        case 'set-admin-id':
            console.log('setting admin id to: ' + action.value);
            
            return {
                ...state,
                admin: {
                    ...state.admin,
                    adminID:action.value
                }
            }
        
        case 'set-object':
            storageObj= action.value;
         
            return {
                ...state,
                packagesList: action.value.packagesList,
                merchantCode:action.value.merchantCode,
                graphData:action.value.graphData,
                admin:action.value.admin,
                defaultVoucherCode:action.value.defaultVoucherCode,
                availableRunningCodes: action.value.availableRunningCodes,
                clientTimeFrames:action.value.clientTimeFrames,
                phoneNumber:action.value.phoneNumber
            }
        
        case 'delete-package':
            const packageList = state.packagesList;
            const temp = [];

            for (const pkg of packageList) {
                if (pkg.duration !== action.value) temp.push(pkg);
            }
            
            return {
                ...state,
                packagesList:temp
            }

        case 'delete-router':
            const routerList2 = state.routersInfo;
            const temp2 = [];

            for (const router of routerList2) {
                if (router.routerIP !== action.value) temp.push(router);
            }

            return {
                ...state,
                routerInfo: temp2
            }
        
        case 'halt-client':
            const codes= state.availableRunningCodes;
            const tempN = [];

            for (const pkg of codes) {
                if (pkg.clientID !== action.value) tempN.push(pkg);
            }

            return {
                ...state,
                availableRunningCodes: temp
            }
        
        case 'phone-number':

            return{
                ...state,
                phoneNumber:action.value
            }
        
        case 'merchant-code':

            return {
                ...state,
                merchantCode:action.value
            }
        
        
        case 'add-package':
            const packageList2 = state.packagesList;
            packageList2.push(action.value);

            return {
                ...state,
                packagesList:packageList2
            }

        case 'add-router':
            const routerList = state.routersInfo;
            routerList.push(action.value);

            return {
                ...state,
                routerInfo:   routerList
            }
            
            
        case 'new-token':
         //   alert(action.value);
            return {
                ...state,
                defaultVoucherCode:action.value
            }
        
        default:
            return {
                ...state
            }

    }
}

