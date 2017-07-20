import { PhoneMatcher } from "../../src/matcher/Phone";
import { AnchorTagBuilder } from "../../src/AnchorTagBuilder";
import { MatchChecker } from "../match/MatchChecker";

describe( "Autolinker.matcher.Phone", function() {
	let matcher: PhoneMatcher;

	beforeEach( function() {
		matcher = new PhoneMatcher( {
			tagBuilder : new AnchorTagBuilder()
		} );
	} );


	describe( 'parseMatches()', function() {

		it( 'should return an empty array if there are no matches for phone numbers', function() {
			expect( matcher.parseMatches( '' ) ).toEqual( [] );
			expect( matcher.parseMatches( 'asdf' ) ).toEqual( [] );
			expect( matcher.parseMatches( '123' ) ).toEqual( [] );
		} );


		it( 'should return an array of a single phone number match when the string is the phone number itself', function() {
			let matches = matcher.parseMatches( '(123) 456-7890' );

			expect( matches.length ).toBe( 1 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '1234567890', 0 );
		} );


		it( 'should return an array of a single phone number match when the phone number is in the middle of the string', function() {
			let matches = matcher.parseMatches( 'Hello (123) 456-7890 my good friend' );

			expect( matches.length ).toBe( 1 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '1234567890', 6 );
		} );


		it( 'should return an array of a single phone number match when the phone number is at the end of the string', function() {
			let matches = matcher.parseMatches( 'Hello (123) 456-7890' );

			expect( matches.length ).toBe( 1 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '1234567890', 6 );
		} );


		it( 'should return an array of multiple phone numbers when there are more than one within the string', function() {
			let matches = matcher.parseMatches( 'Talk to (123) 456-7890 or (234) 567-8901' );

			expect( matches.length ).toBe( 2 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '1234567890', 8 );
			MatchChecker.expectPhoneMatch( matches[ 1 ], '2345678901', 26 );
		} );


		it( 'a match within parenthesis should be parsed correctly', function() {
			let matches = matcher.parseMatches( 'Hello ((123) 456-7890)' );

			expect( matches.length ).toBe( 1 );
			MatchChecker.expectPhoneMatch( matches[ 0 ], '1234567890', 7 );
		} );

	} );


} );