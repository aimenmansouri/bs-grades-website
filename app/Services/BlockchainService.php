<?php

namespace App\Services;

use Web3\Web3;
use Web3\Contract;
use Web3\Utils;

class BlockchainService
{
    private $web3;
    private $contract;
    private $contractAddress;
    private $abi;
    private $account;

    public function __construct()
    {
        $this->web3 = new Web3('http://localhost:7545');

        $contractData = json_decode(file_get_contents(base_path('contract-data.json')), true);
        $this->contractAddress = $contractData['address'];
        $this->abi = $contractData['abi'];

        $this->contract = new Contract($this->web3->provider, $this->abi);
        $this->account = '0x...'; // Your account address from Ganache/Hardhat
    }

    public function addGrade($studentId, $courseId, $grade, $kind)
    {
        $this->contract->at($this->contractAddress)->send('addGrade', $studentId, $courseId, $grade, $kind, [
            'from' => $this->account,
            'gas' => '0x200b20'
        ], function ($err, $result) {
            if ($err !== null) {
                throw new \Exception('Error: ' . $err->getMessage());
            }
            return $result;
        });
    }

    public function verifyGrade($studentId, $courseId, $grade, $timestamp)
    {
        $result = null;
        $this->contract->at($this->contractAddress)->call('verifyGrade', $studentId, $courseId, $grade, $timestamp, function ($err, $res) use (&$result) {
            if ($err !== null) {
                throw new \Exception('Error: ' . $err->getMessage());
            }
            $result = $res;
        });
        return $result[0] ?? false;
    }
}
