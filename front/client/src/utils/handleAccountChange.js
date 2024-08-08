export const handleAccountChange = async(handleWallet)=>{
    handleWallet()
}
// export const handleAccountChange = async(setWeb3State)=>{
//     const accounts = await window.ethereum.request({
//         method:'eth_requestAccounts'
//     })
//     let selectedAccount = accounts[0];
//     console.log(selectedAccount)
//     setWeb3State((prevState)=>({...prevState,selectedAccount}));
// }