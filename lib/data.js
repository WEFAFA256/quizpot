export const QUESTIONS = [
  // Round 1-2: Very Easy
  { id: 1, q: "What is the capital city of Uganda?", options: ["Jinja", "Kampala", "Entebbe", "Gulu"], answer: 1, difficulty: 1, category: "Geography" },
  { id: 2, q: "What is the currency of Uganda?", options: ["Kenyan Shilling", "Uganda Shilling", "Rand", "Franc"], answer: 1, difficulty: 1, category: "General" },
  // Round 3-4: Easy
  { id: 3, q: "Which lake borders Uganda to the south?", options: ["Lake Tanganyika", "Lake Malawi", "Lake Victoria", "Lake Albert"], answer: 2, difficulty: 2, category: "Geography" },
  { id: 4, q: "Which river flows out of Lake Victoria in Uganda?", options: ["Congo River", "Nile River", "Zambezi River", "Niger River"], answer: 1, difficulty: 2, category: "Geography" },
  // Round 5-6: Medium
  { id: 5, q: "What is the largest tribe in Uganda?", options: ["Acholi", "Langi", "Baganda", "Banyankole"], answer: 2, difficulty: 3, category: "Culture" },
  { id: 6, q: "In what year did Uganda gain independence?", options: ["1960", "1961", "1962", "1963"], answer: 2, difficulty: 3, category: "History" },
  // Round 7-8: Hard
  { id: 7, q: "Which mountain is the highest point in Uganda?", options: ["Mt. Elgon", "Mt. Moroto", "Mt. Rwenzori", "Mt. Muhavura"], answer: 2, difficulty: 4, category: "Geography" },
  { id: 8, q: "What is Uganda's national bird?", options: ["Eagle", "Grey Crowned Crane", "Flamingo", "Pelican"], answer: 1, difficulty: 4, category: "Nature" },
  // Round 9-10: Very Hard
  { id: 9, q: "Which Ugandan athlete won gold at the 2021 Tokyo Olympics in the 3000m Steeplechase?", options: ["Joshua Cheptegei", "Peruth Chemutai", "Jacob Kiplimo", "Stephen Kiprotich"], answer: 1, difficulty: 5, category: "Sports" },
  { id: 10, q: "Approximately what percentage of Uganda is covered by water bodies?", options: ["8%", "15%", "18%", "25%"], answer: 1, difficulty: 5, category: "Geography" },
];

export const WINNERS = [
  { name: "John K.", amount: 620000, time: "2h ago", round: 10 },
  { name: "Aisha M.", amount: 480000, time: "Yesterday", round: 10 },
  { name: "Peter O.", amount: 910000, time: "2 days ago", round: 10 },
  { name: "Sarah N.", amount: 355000, time: "3 days ago", round: 10 },
  { name: "David M.", amount: 720000, time: "4 days ago", round: 10 },
];

export const formatUGX = (n) => `UGX ${Number(n).toLocaleString()}`;

export const GAME_CONFIG = {
  ENTRY_FEE: 1000,
  PRIZE_PERCENTAGE: 0.7,
  TIME_PER_QUESTION: 15,
  TOTAL_ROUNDS: 10,
  INITIAL_POT: 847000,
  INITIAL_PLAYERS: 1243,
};
