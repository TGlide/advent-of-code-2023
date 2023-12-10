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
  arr.each do |v|
    res += v
  end
  return res
end

def partOne(input : String) : Int32
  lines = input.split("\n")
  numbers = [] of Int32

  lines.each do |line|
    first = nil
    last = nil

    line.each_char do |char|
      if integer? char
        if !first
          first = char
        end
        last = char
      end
    end

    num = "#{first}#{last}"
    numbers << Int32.new(num)
  end

  return sum numbers
end

puts "Part one:", partOne File.read("./inputs/1.txt")

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

  lines.each do |line|
    first = nil
    last = nil
    textSoFar = ""

    line.each_char do |char|
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
    end

    num = "#{first}#{last}"
    numbers << Int32.new(num)
  end

  return sum numbers
end

puts "Part two:", partTwo File.read("./inputs/1.txt")
