

async function ApiRequest(url = '', optionType = null, errMsg = null) {
try{
    let response = await fetch(url, optionType)
    if(!response.ok) throw Error('Please Reload Page!')
} catch (err){
    errMsg = err.message;
  }finally{
    return errMsg;
}

}

export default ApiRequest;
