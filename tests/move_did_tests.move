module move_aiid::move_did_tests {
    use move_aiid::move_did;
    use std::signer;
    use std::string;

    #[test(account = @0x1)]
    public entry fun test_register_and_update_bio(account: &signer) {
        // Test the DID registration
        move_did::register_did(account, string::utf8(b"did:move:example"), 100);
        // Test updating the bio
        move_did::update_bio(account, string::utf8(b"John Doe"), string::utf8(b"This is my bio"), string::utf8(b"https://twitter.com/johndoe"));
        // A simple assertion (expand tests as needed)
        assert!(true, 0);
    }
}
