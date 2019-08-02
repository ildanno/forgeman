const statusCodeIs = code => () => pm.response.to.have.status(code),
    test = pm.test
