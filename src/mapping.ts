import { BigInt } from "@graphprotocol/graph-ts"
import {
  BridgeMapper,
  BridgeMappingUpdated,
  EternalOwnershipTransferred
} from "../generated/BridgeMapper/BridgeMapper"
import { Mapping } from "../generated/schema"

export function handleBridgeMappingUpdated(event: BridgeMappingUpdated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Mapping.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Mapping(event.transaction.from.toHex())
  }

  // Entity fields can be set based on event parameters
  entity.key = event.params.key
  entity.foreignToken = event.params.foreignToken
  entity.homeToken = event.params.homeToken
  entity.foreignBridge = event.params.foreignBridge
  entity.homeBridge = event.params.homeBridge
  entity.foreignStartBlock = event.params.foreignStartBlock
  entity.homeStartBlock = event.params.homeStartBlock

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let bridgeMapper = BridgeMapper.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - bridgeMapper.getBridgeMapperVersion(...)
  // - bridgeMapper.foreignStartBlockByKey(...)
  // - bridgeMapper.getAddBridgeMappingHash(...)
  // - bridgeMapper.isInitialized(...)
  // - bridgeMapper.foreignBridgeByKey(...)
  // - bridgeMapper.foreignTokenByKey(...)
  // - bridgeMapper.hashedTxs(...)
  // - bridgeMapper.homeBridgeByKey(...)
  // - bridgeMapper.owner(...)
  // - bridgeMapper.initialize(...)
  // - bridgeMapper.homeStartBlockByKey(...)
  // - bridgeMapper.homeTokenByKey(...)
}

export function handleEternalOwnershipTransferred(
  event: EternalOwnershipTransferred
): void {}
