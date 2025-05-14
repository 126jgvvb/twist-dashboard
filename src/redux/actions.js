
export const deletePackage = (nameStr) => ({
    type: 'delete-package',
    value:nameStr
});

export const deleteRouter = (nameStr) => ({
    type: 'delete-router',
    value: nameStr
});

export const haltClient = (phoneNumber) => ({
    type: 'halt-client',
    value: phoneNumber
});

export const addPackage = (packObj) => ({
    type: "add-package",
    value: packObj
});



export const addRouter = (obj) => ({
    type: "add-router",
    value: obj
});


export const setNewCode = (value) => ({
    type: 'new-token',
    value:value
});

export const setPhoneNumber = (value) => ({
    type: 'phone-number',
    value: value
});


export const setMerchantCode = (value) => ({
    type: 'merchant-code',
    value: value
});

export const setObject = (object) => {
     return ({
        type: 'set-object',
        value: object
    })
};


export const setAdminID = (value) => ({
    type: 'set-admin-id',
    value:value
});