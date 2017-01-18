<?php


function sonycl_gameplay_return_locations($number){

	$dummy_locations = array(
		'Fortress of Minceta',
		'Blue Grotto sea cave',
		'Jungfraujoch mountain railway ',
		'Forth Rail Bridge',
		'The Old Bridge',
		'Notre Dame Cathedral',
		'Blinking Bridge',
		'Villa del Balbianello',
		'Castle Urquhart',
		'Komsomolskaya Metro Station',
		'Hadrians Wall',
		'Delphi ',
		'Eiffel Tower',
		'Bratislava Castle',
		'Giants Causeway',
		'Blarney Stone, Cork',
		'Novgorod Kremlin',
		'Knossos',
		'The Blue Lagoon',
		'Ponte 25 de Abril Bridge',
		'The Hermitage',
		'Sacre Coeur',
		'American Cemetery',
		'Stonehenge',
		'Parthenon',
		'Scottish Cafe',
		'Guggenheim Museum',
		'Palace of Versailles ',
		'Great Geysir',
		'Edinburgh Castle ',
		'Temple Bar',
		'Arc de Triomphe',
		'Pont Du Gard',
		'Newgrange',
		'Kjeragbolten',
		'Dalí&rsquo;s Rhinoceros',
		'Rock of Gibraltar',
		'The Alhambra',
		'The Pravcice Gate',
		'Wieliczka Salt Mine',
		'Big Ben',
		'Cologne Cathedral',
		'Red Square',
		'Butrint, Sarande',
		'St Pauls Cathedral',
		'Spanish Riding School',
		'Hagar Qim',
		'Leaning Tower of Pisa',
		'Rijksmuseum',
		'Bridge of Sighs',
		'Mamayev Kurgan statue',
		'Plaza del Pueblo',
		'Polaria arctic museum',
		'Town Hall Square',
		'Waterloo Monument',
		'Tallinn Town Hall Square',
		'Kykkos Monastery',
		'Monastery of Ostrog ',
		'Mainau Island',
		'St. Alexander Nevski Cathedral',
		'Zermatt',
		'Swarovski Crystal World',
		'Vimy Ridge',
		'Theresienwiese',
		'Chartres Cathedral',
		'Privilege',
		'IronBridge',
		'The Gherkin',
		'Riga Cathedral',
		'Van Gogh Museum',
		'Aya Sofya',
		'Centro de Arte Reina Sofía',
		'Galleria dell&rsquo;Accademia',
		'Palazzo Ducale',
		'Castelo de São Jorge'
	);


	shuffle($dummy_locations);
	for($i = 0; $i < $number; $i++){
		$options[rand(100,999)] = $dummy_locations[$i];
	}
	return $options;
}


?>