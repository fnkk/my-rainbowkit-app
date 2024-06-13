
const hostUrl = 'http://192.168.3.118:9211'
// const hostUrl = '/test'
const getNonce = async () => {
    const response = await fetch(`${hostUrl}/api/auth/nonce`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data;
}

const initTaskListByAccount = async (account: string) => {
    const response = await fetch(`${hostUrl}/api/auth/sign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            walletAddress: account,
        })
    })
    const data = await response.json();
    return data;
}

export { getNonce, initTaskListByAccount, };
