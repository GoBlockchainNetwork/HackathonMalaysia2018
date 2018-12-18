package com.example.qrcodescanner;

import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 3.4.0.
 */
public class CheeTest extends Contract {
    private static final String BINARY = "608060405234801561001057600080fd5b506040516105783803806105788339810180604052602081101561003357600080fd5b81019080805164010000000081111561004b57600080fd5b8201602081018481111561005e57600080fd5b815164010000000081118282018710171561007857600080fd5b505060008054600160a060020a0319163317905580519093506100a492506001915060208401906100ab565b5050610146565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100ec57805160ff1916838001178555610119565b82800160010185558215610119579182015b828111156101195782518255916020019190600101906100fe565b50610125929150610129565b5090565b61014391905b80821115610125576000815560010161012f565b90565b610423806101556000396000f3fe60806040526004361061005b577c010000000000000000000000000000000000000000000000000000000060003504633ab0886581146100605780638da5cb5b14610115578063c412eaba14610153578063f2fde38b146101dd575b600080fd5b34801561006c57600080fd5b506101136004803603602081101561008357600080fd5b81019060208101813564010000000081111561009e57600080fd5b8201836020820111156100b057600080fd5b803590602001918460018302840111640100000000831117156100d257600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061021d945050505050565b005b34801561012157600080fd5b5061012a610234565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561015f57600080fd5b50610168610250565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101a257818101518382015260200161018a565b50505050905090810190601f1680156101cf5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101e957600080fd5b506101136004803603602081101561020057600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166102e6565b805161023090600190602084019061035f565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60018054604080516020601f600260001961010087891615020190951694909404938401819004810282018101909252828152606093909290918301828280156102db5780601f106102b0576101008083540402835291602001916102db565b820191906000526020600020905b8154815290600101906020018083116102be57829003601f168201915b505050505090505b90565b60005473ffffffffffffffffffffffffffffffffffffffff16331461030a57600080fd5b73ffffffffffffffffffffffffffffffffffffffff81161561035c576000805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff83161790555b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106103a057805160ff19168380011785556103cd565b828001600101855582156103cd579182015b828111156103cd5782518255916020019190600101906103b2565b506103d99291506103dd565b5090565b6102e391905b808211156103d957600081556001016103e356fea165627a7a72305820227a4f5b1b4b8ba61aa85b1c7ad99885fecb4d05a0d1d13e84be55fa3a645a530029";

    public static final String FUNC_UPDATEITEMLOCATION = "updateItemLocation";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_GETITEM = "getItem";

    public static final String FUNC_TRANSFEROWNERSHIP = "transferOwnership";

    public CheeTest(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    public CheeTest(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public RemoteCall<TransactionReceipt> updateItemLocation(String _data) {
        final Function function = new Function(
                FUNC_UPDATEITEMLOCATION, 
                Arrays.<Type>asList(new Utf8String(_data)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<String> owner() {
        final Function function = new Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteCall<String> getItem() {
        final Function function = new Function(FUNC_GETITEM, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteCall<TransactionReceipt> transferOwnership(String newOwner) {
        final Function function = new Function(
                FUNC_TRANSFEROWNERSHIP, 
                Arrays.<Type>asList(new Address(newOwner)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public static RemoteCall<CheeTest> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, String _data) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Utf8String(_data)));
        return deployRemoteCall(CheeTest.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    public static RemoteCall<CheeTest> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, String _data) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Utf8String(_data)));
        return deployRemoteCall(CheeTest.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    public static CheeTest load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new CheeTest(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    public static CheeTest load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new CheeTest(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }
}
