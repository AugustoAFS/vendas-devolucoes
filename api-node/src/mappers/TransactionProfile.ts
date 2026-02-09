import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Sale } from '../entities/Sale';
import { Refund } from '../entities/Refund';

export class TransactionData {
    cd_produto!: string;
    cd_empresa!: string;
    nr_dctoorigem!: string;
    in_estorno!: 'T' | 'F';
    round!: number;
}

export function createTransactionMappings(mapper: Mapper) {
    createMap(
        mapper,
        TransactionData,
        Sale,
        forMember(
            (dest) => dest.productCode,
            mapFrom((src: TransactionData) => src.cd_produto)
        ),
        forMember(
            (dest) => dest.companyCode,
            mapFrom((src: TransactionData) => src.cd_empresa)
        ),
        forMember(
            (dest) => dest.isReversal,
            mapFrom(() => false)
        ),
        forMember(
            (dest) => dest.documentNumber,
            mapFrom((src: TransactionData) => src.nr_dctoorigem)
        ),
        forMember(
            (dest) => dest.value,
            mapFrom((src: TransactionData) => src.round)
        )
    );

    createMap(
        mapper,
        TransactionData,
        Refund,
        forMember(
            (dest) => dest.productCode,
            mapFrom((src: TransactionData) => src.cd_produto)
        ),
        forMember(
            (dest) => dest.companyCode,
            mapFrom((src: TransactionData) => src.cd_empresa)
        ),
        forMember(
            (dest) => dest.isReversal,
            mapFrom(() => true)
        ),
        forMember(
            (dest) => dest.documentNumber,
            mapFrom((src: TransactionData) => src.nr_dctoorigem)
        ),
        forMember(
            (dest) => dest.value,
            mapFrom((src: TransactionData) => src.round)
        )
    );
}