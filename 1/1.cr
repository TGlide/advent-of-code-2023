def integer?(value : String | Char) : Bool
  begin
    Int32.new value
    return true
  rescue
    return false
  end
end

def sum(arr : Array(Int32)) : Int32
  res = 0

  i = 0
  until i >= arr.size
    res += arr[i]
    i += 1
  end

  return res
end

def main(input : String) : Int32
  lines = input.split("\n")

  numbers = [] of Int32

  i = 0
  until i == lines.size
    line = lines[i]
    first = nil
    last = nil

    j = 0
    until j == line.size
      char = line[j]

      if integer? char
        if !first
          first = char
        end
        last = char
      end

      j += 1
    end

    if first.is_a? Char && last.is_a? Char
      num = "#{first}#{last}"
      numbers << Int32.new(num)
    end

    i += 1
  end

  return sum numbers
end

p! main "1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet"
