module move_aiid::move_did {
    use std::string::{String};
    use std::signer;
    use std::option;

    /// Represents the decentralized identity of a user.
    struct DID has key, store {
        id: String,
        created_at: u64,
    }

    /// Represents the user's on-chain profile information.
    struct Bio has key, store, drop {
        name: String,
        bio: String,
        social_link: String,
    }

    /// Registers a new DID on-chain.
    public entry fun register_did(account: &signer, id: String, timestamp: u64) {
        let addr = signer::address_of(account);
        if (exists<DID>(addr)) {
            // If a DID already exists, abort with error code 1.
            abort 1;
        }
        let did = DID { id, created_at: timestamp };
        move_to(account, did);
    }

    /// Creates or updates the on-chain profile (bio).
    public entry fun update_bio(account: &signer, name: String, bio: String, social_link: String) {
        let addr = signer::address_of(account);
        if (exists<Bio>(addr)) {
            // Remove the existing profile to update it.
            move_from<Bio>(addr);
        }
        let profile = Bio { name, bio, social_link };
        move_to(account, profile);
    }

    /// View function to get a DID record.
    #[view]
    public fun get_did(addr: address): option::Option<DID> {
        if (exists<DID>(addr)) {
            option::some(borrow_global<DID>(addr))
        } else {
            option::none()
        }
    }

    /// View function to get a Bio record.
    #[view]
    public fun get_bio(addr: address): option::Option<Bio> {
        if (exists<Bio>(addr)) {
            option::some(borrow_global<Bio>(addr))
        } else {
            option::none()
        }
    }
}
