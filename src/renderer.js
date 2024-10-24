// Date of Flight를 저장할 변수
let arrivalDateOfFlight = '';
let departureDateOfFlight = '';

// 현재 시간을 ZULU 시간 기준으로 HHMM 형식으로 반환하는 함수
function getZuluTime() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    return `${hours}${minutes}`;
}

// 날짜에서 DD 부분만 추출하는 함수
function getDateOfFlight() {
    const now = new Date();
    return String(now.getUTCDate()).padStart(2, '0');
}

// LAND-TIME 설정 함수
function setLandTime() {
    // 날짜를 기억
    arrivalDateOfFlight = getDateOfFlight();
    // LAND-TIME 설정
    document.getElementById('arrival-land-time').value = getZuluTime();
}

// BLOCK-TIME 설정 함수
function setBlockTime(type) {
    const time = getZuluTime();
    if (type === 'arrival') {
        // 날짜를 기억
        arrivalDateOfFlight = getDateOfFlight();
        document.getElementById('arrival-block-time').value = time;
    } else if (type === 'departure') {
        // 날짜를 기억
        departureDateOfFlight = getDateOfFlight();
        document.getElementById('departure-block-time').value = time;
    }
}

// TAKEOFF-TIME 설정 함수
function setTakeoffTime() {
    document.getElementById('departure-takeoff-time').value = getZuluTime();
}

function timeToMinutes(time) {
    const hours = parseInt(time.slice(0, 2), 10);
    const minutes = parseInt(time.slice(2), 10);
    return hours * 60 + minutes;
}

// 분을 HHMM 형식의 문자열로 변환하는 함수
function minutesToTime(totalMinutes) {
    // 24시간(1440분) 초과 시 1440을 빼줌
    totalMinutes = totalMinutes % 1440;
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const minutes = String(totalMinutes % 60).padStart(2, '0');
    return `${hours}${minutes}`;
}

// 도착 메시지 표시 함수
function showArrivalMessage() {
    const callsign = document.getElementById('arrival-callsign').value;
    const regNo = document.getElementById('arrival-regno').value;
    const iata = document.getElementById('arrival-iata').value;
    const landTime = document.getElementById('arrival-land-time').value;
    const blockTime = document.getElementById('arrival-block-time').value;

    const message = `MVT ${callsign} [${regNo}]\nMVT\n${callsign}/${arrivalDateOfFlight}.${regNo}.${iata}\nAA ${landTime}/${blockTime}`;
    document.getElementById('result').innerText = message;
}

// 출발 메시지 표시 함수
function showDepartureMessage() {
    const callsign = document.getElementById('departure-callsign').value;
    const regNo = document.getElementById('departure-regno').value;
    const iata = document.getElementById('departure-iata').value;
    const aiata = document.getElementById('dep-arrival-iata').value;
    const blockTime = document.getElementById('departure-block-time').value;
    const takeoffTime = document.getElementById('departure-takeoff-time').value;
    const enrouteTime = document.getElementById('enroute-time').value;
    const pax = document.getElementById('PAX').value;
    const bag = document.getElementById('BAG').value;
    const takeoffMinutes = timeToMinutes(takeoffTime);
    const enrouteMinutes = timeToMinutes(enrouteTime);
    const etaTime = minutesToTime(takeoffMinutes + enrouteMinutes);


    const message = `MVT ${callsign} [${regNo}]\nMVT\n${callsign}/${departureDateOfFlight}.${regNo}.${iata}\nAD ${blockTime}/${takeoffTime}\nEA ${etaTime}.${aiata}\nPAX ${pax}\nBAG ${bag}`
    document.getElementById('result').innerText = message;
}
