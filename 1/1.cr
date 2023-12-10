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

def partOne(input : String) : Int32
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

p! partOne File.read("./1/input.txt")

def extractNumFromText(text : String) : Int32 | Nil
  numberWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
  numberWords.each do |nw|
    if text.index nw
      nwIndex = numberWords.index nw
      if nwIndex
        return nwIndex + 1
      end
    end
  end

  return nil
end

def partTwo(input : String) : Int32
  lines = input.split("\n")

  numbers = [] of Int32

  i = 0
  lines.each do |line|
    line = lines[i]
    first = nil
    last = nil
    textSoFar = ""

    j = 0
    until j == line.size
      char = line[j]
      textSoFar += char

      if extractNumFromText(textSoFar)
        if !first
          first = "#{extractNumFromText(textSoFar)}"
        end
        last = "#{extractNumFromText(textSoFar)}"
        textSoFar = ""
      elsif integer? char
        if !first
          first = char
        end
        last = char
      end

      j += 1
    end

    num = "#{first}#{last}"
    numbers << Int32.new(num)

    i += 1
  end

  return sum numbers
end

p! partTwo File.read("./1/input.txt")
