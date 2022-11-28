1-7, 10. Sort와 Filter 메소드의 사용
=> 특정 로직을 통해 새 배열을 만들어내는 기능을 한다.

    배열에서 sort라는 메소드를 활용하면 배열을 정렬할 수 있습니다.
    sort 메소드에 아무런 아규먼트도 전달하지 않을 때는 기본적으로 유니코드에 정의된 문자열 순서에 따라 정렬됩니다.
    const letters = ['D', 'C', 'E', 'B', 'A'];
    const numbers = [1, 10, 4, 21, 36000];

    letters.sort();
    numbers.sort();

    console.log(letters); // (5) ["A", "B", "C", "D", "E"]
    console.log(numbers); // (5) [1, 10, 21, 36000, 4]
    그렇기 때문에 numbers에 sort 메소드를 사용한 것 처럼, 숫자를 정렬할 때는 우리가 상식적으로 이해하는 오름차순이나 내림차순 정렬이 되지 않습니다.
    그럴 땐 sort 메소드에 다음과 같은 콜백함수를 아규먼트로 작성해주면 되는데요.
    const numbers = [1, 10, 4, 21, 36000];

    // 오름차순 정렬
    numbers.sort((a, b) => a - b);
    console.log(numbers); // (5) [1, 4, 10, 21, 36000]

    // 내림차순 정렬
    numbers.sort((a, b) => b - a);
    console.log(numbers); // (5) [36000, 21, 10, 4, 1]
    sort 메소드를 사용할 때 한 가지 주의해야될 부분은 메소드를 실행하는 원본 배열의 요소들을 정렬한다는 점입니다.
    그래서 한 번 정렬하고 나면 정렬하기 전의 순서로 다시 되돌릴 수 없으니, 그런 경우에는 미리 다른 변수에 복사해두는 것이 좋겠죠!?
    reverse 메소드
    reverse 메소드는 말 그대로 배열의 순서를 뒤집어 주는 메소드 입니다.
    reverse 메소드는 별도의 파라미터가 존재하지 않기 때문에 단순이 메소드를 호출해주기만 하면 배열의 순서가 뒤집히는데요.
    sort 메소드와 마찬가지로 원본 배열의 요소들을 뒤집어 버린다는 점은 꼭 주의헤야 합니다.
    const letters = ['a', 'c', 'b'];
    const numbers = [421, 721, 353];

    letters.reverse();
    numbers.reverse();

    console.log(letters); // (3) ["b", "c", "a"]
    console.log(numbers); // (3) [353, 721, 421]

    *참고
    반환 값에 따른 sort()함수의 해석

    반환 값 < 0 : a가 b보다 앞에 있어야 한다.
    반환 값 = 0 : a와 b의 순서를 바꾸지 않는다.
    반환 값 > 0 : b가 a보다 앞에 있어야 한다.

1-12. 배열을 렌더링할 땐 key를 기억하세요
=> React에 배열의 변화를 정확하게 알려주기 위해 사용한다.
key를 index값이나 지정하지 않게되면 해당 컴포넌트를 지정하거나
사용할때 위치가 뒤섞이거나 특정되지 않는 문제가 발생한다
반드시 고유값을 지정해줄것

2 - 06. 서버에서 정렬한 데이터 받아오기(useEffect)
useEffect(() => {
callback()
},[dependency list])

처음 렌더링 할때는 callback을 실행하고 다음 렌더링에서는 dependency list와 비교해서 차이가 있다면 call back을 재실행함
