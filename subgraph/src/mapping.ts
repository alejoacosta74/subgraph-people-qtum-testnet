import { BigInt } from "@graphprotocol/graph-ts"
import {
  PersonRegistry,
  NewPerson,
  UpdatedPerson
} from "../generated/PersonRegistry/PersonRegistry"
import { Person } from "../generated/schema"

export function handleNewPerson(event: NewPerson): void {
  let person = new Person(event.params.id.toHex())
  person.owner = event.params.owner
  person.imageUrl = event.params.imageUrl
  person.displayName = event.params.displayName
  person.save()
}

export function handleUpdatedPerson(event: UpdatedPerson): void {
  let id = event.params.id.toHex()
  let person = Person.load(id)
  if (person == null){
    person = new Person(id)
  }
  person.owner = event.params.owner
  person.imageUrl = event.params.imageUrl
  person.displayName = event.params.displayName
  person.save()
}