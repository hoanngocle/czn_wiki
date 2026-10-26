"use client";

import { useCallback } from "react";
import { label } from "../wiki/labels";
import { useStoredValue } from "./storage";

export const languageKey = "czn_combatant_vietnamese";

const interfaceLabels: Record<string, string> = {
  UNIQUE: "Unique", RARE: "Rare", COMMON: "Common", cost: "Cost",
  "Deck Builder": "Deck Builder", Equipment: "Equipment", Items: "Items", Terminology: "Thuật ngữ",
  "Toggle theme": "Đổi giao diện", "Theme": "Giao diện", light: "sáng", dark: "tối", system: "hệ thống",
  "Open navigation": "Mở điều hướng", "Close navigation": "Đóng điều hướng", "CZN navigation": "Điều hướng CZN", "Coming soon": "Sắp ra mắt",
  "Choose a combatant": "Chọn Combatant", "Select a combatant to view their details.": "Chọn một Combatant để xem thông tin chi tiết.",
  "Build, customize, and save your Chaos Zero Nightmare decks.": "Tạo, tùy chỉnh và lưu bộ bài Chaos Zero Nightmare của bạn.",
  "New deck": "Bộ bài mới", "＋ New deck": "＋ Bộ bài mới", "Saved decks": "Bộ bài đã lưu", "Dismiss notification": "Đóng thông báo",
  cards: "lá", combatant: "Combatant", partner: "Partner", "decks imported": "bộ bài đã được nhập.", LEGEND: "Legendary", effect: "hiệu ứng", Sortie: "Sortie",
  "Builder sections": "Các phần xây bộ bài", Setup: "Thiết lập", "Deck setup": "Thiết lập bộ bài", "Deck cards": "Các lá trong bộ bài",
  "Partner effects": "Hiệu ứng Partner", "3 slots": "3 ô", "Memory fragments": "Memory Fragments", "＋ Add memory fragments": "＋ Thêm Memory Fragments",
  "Your deck": "Bộ bài của bạn", "Add card": "Thêm bài", "Your deck is empty": "Bộ bài chưa có lá nào", "Start with a combatant": "Bắt đầu bằng một Combatant",
  "Add cards to build your deck.": "Thêm lá bài để xây dựng bộ bài.", "Select a combatant to load their starting cards, then customize your build.": "Chọn Combatant để lấy bộ bài khởi đầu, sau đó tùy chỉnh cách xây dựng.",
  "Choose cards": "Chọn bài", "Select combatant": "Chọn Combatant", Edit: "Chỉnh sửa", Copy: "Sao chép", Remove: "Xóa", Select: "Chọn", Choose: "Chọn", Equip: "Trang bị",
  weapon: "Weapon", armor: "Armor", accessory: "Accessory", "Deck statistics": "Thống kê bộ bài", "Total cards": "Tổng số lá", "Average cost": "Cost trung bình",
  "PT usage": "PT đã dùng", "PT limit": "Giới hạn PT", "Over the PT limit by": "Vượt giới hạn PT", "Card composition": "Thành phần bộ bài", "Cost distribution": "Phân bố Cost",
  Monster: "Monster", Curse: "Curse", Event: "Event", Persona: "Persona",
  "Save deck": "Lưu bộ bài", "Share deck": "Chia sẻ bộ bài", "Deck name": "Tên bộ bài", Save: "Lưu", "Save as copy": "Lưu bản sao",
  "Decks are saved in this browser. Export a backup to keep or transfer them.": "Bộ bài được lưu trong trình duyệt này. Xuất bản sao lưu để giữ lại hoặc chuyển sang thiết bị khác.",
  "Export JSON": "Xuất JSON", "Import JSON": "Nhập JSON", "Export original backup": "Xuất bản sao lưu gốc", "Reset saved deck storage": "Đặt lại kho bộ bài",
  "Your original saved data has not been overwritten. Download it before resetting this browser’s saved decks.": "Dữ liệu gốc chưa bị ghi đè. Hãy tải bản sao lưu trước khi đặt lại kho bộ bài trong trình duyệt này.",
  "No saved decks yet. Build a deck and save it here.": "Chưa có bộ bài đã lưu. Hãy tạo một bộ bài và lưu tại đây.", Load: "Mở", Rename: "Đổi tên", Delete: "Xóa",
  "Anyone with this link can open a copy of your deck.": "Bất kỳ ai có liên kết này đều có thể mở bản sao bộ bài của bạn.", "Share link": "Liên kết chia sẻ", "Copy link": "Sao chép liên kết",
  "PT breakdown": "Chi tiết PT", "Removed starting cards": "Starting Cards đã xóa", "Copies beyond the first two": "Bản sao vượt quá hai lá đầu", "Neutral, event and curse cards": "Neutral, Event và Curse Cards", "Monster cards": "Monster Cards", "Divine epiphanies": "Divine Epiphanies", Total: "Tổng",
  "Removed starting cards: 20 PT each. The first two copies are free, then 40 PT each. Neutral, event and curse cards: 20 PT. Monster cards: 20 / 50 / 80 PT by rarity. Divine epiphanies: 20 PT per card.": "Mỗi Starting Card bị xóa: 20 PT. Hai bản đầu không tốn PT, mỗi bản tiếp theo: 40 PT. Neutral, Event và Curse Cards: 20 PT. Monster Cards: 20 / 50 / 80 PT tùy Rarity. Divine Epiphanies: 20 PT mỗi lá.",
  "Import deck backup": "Nhập bản sao lưu bộ bài", "Close dialog": "Đóng hộp thoại", "Choose combatant": "Chọn Combatant", "Choose partner": "Chọn Partner",
  "Search characters": "Tìm Combatant", "Search by name…": "Tìm theo tên…", Class: "Vai trò", "All classes": "Tất cả vai trò", "All egos": "Tất cả hệ Ego", "All rarities": "Tất cả độ hiếm",
  "No characters match these filters.": "Không có Combatant phù hợp với bộ lọc.", "Search equipment": "Tìm trang bị", "Search equipment or effects…": "Tìm trang bị hoặc hiệu ứng…", "Equipment rarity": "Độ hiếm trang bị",
  "No equipment matches these filters.": "Không có trang bị phù hợp với bộ lọc.", "Show more": "Xem thêm", pieces: "mảnh", "Edit card": "Chỉnh sửa bài",
  "Search cards": "Tìm bài", "Search cards or effects…": "Tìm bài hoặc hiệu ứng…", "Card source": "Nguồn bài", "All sources": "Tất cả nguồn", "Card cost": "Chi phí bài", "All costs": "Tất cả Cost", "Card category": "Loại bài", "All types": "Tất cả loại",
  "No cards match these filters.": "Không có lá bài phù hợp với bộ lọc.", "Epiphany type": "Loại Epiphany", "All epiphanies": "Tất cả Epiphanies", Normal: "Normal", "Include Sortie": "Gồm Sortie",
  "Choose up to two engravings. The same engraving can occupy both slots.": "Chọn tối đa hai Engravings. Có thể chọn cùng một Engraving cho cả hai ô.",
  "Choose one normal and one divine epiphany. Only compatible effects are shown.": "Chọn một Normal Epiphany và một Divine Epiphany. Chỉ hiển thị các hiệu ứng tương thích.",
  "No compatible effects.": "Không có hiệu ứng tương thích.", "Card variant": "Biến thể bài", "Base card": "Base Card", "Confirm card": "Xác nhận bài", "Select a card to preview and customize it.": "Chọn một lá bài để xem trước và tùy chỉnh.",
  "Unable to complete this action.": "Không thể hoàn thành thao tác này.", "Deck saved in this browser.": "Đã lưu bộ bài trong trình duyệt này.",
  "Saved decks could not be read. Saving is paused to preserve your data. Open Saved decks to export the original backup.": "Không đọc được bộ bài đã lưu. Tạm dừng lưu để bảo vệ dữ liệu. Mở Bộ bài đã lưu để xuất bản sao lưu gốc.",
  "This share link is invalid or contains data unavailable in the local catalog.": "Liên kết chia sẻ không hợp lệ hoặc chứa dữ liệu chưa có trong danh mục.",
  "Saving is paused to protect unreadable browser data. Export the original backup from Saved decks before resetting storage.": "Tạm dừng lưu để bảo vệ dữ liệu không đọc được. Xuất bản sao lưu gốc trong Bộ bài đã lưu trước khi đặt lại kho lưu trữ.",
  "Browser data has changed and cannot be read. Saving is paused to protect it.": "Dữ liệu trình duyệt đã thay đổi và không đọc được. Tạm dừng lưu để bảo vệ dữ liệu.",
  "Saved decks changed in another tab. The list has been refreshed; please try again.": "Bộ bài đã thay đổi ở thẻ khác. Danh sách đã được cập nhật; vui lòng thử lại.",
  "You can save up to 500 decks. Export a backup before removing old decks.": "Có thể lưu tối đa 500 bộ bài. Xuất bản sao lưu trước khi xóa bộ bài cũ.",
  "Saved decks exceed 2 MB. Export a backup and remove older decks first.": "Bộ bài đã lưu vượt quá 2 MB. Hãy xuất bản sao lưu rồi xóa bớt bộ bài cũ.",
  "Start a new deck? Unsaved changes will be discarded.": "Tạo bộ bài mới? Các thay đổi chưa lưu sẽ bị bỏ.", "Backup is too large (maximum 2 MB).": "Bản sao lưu quá lớn (tối đa 2 MB).",
  "Change combatant and replace the current deck?": "Đổi Combatant và thay bộ bài hiện tại?", "Reset saved decks? Make sure you have exported the original backup. This removes the unreadable saved data from this browser.": "Đặt lại bộ bài đã lưu? Hãy chắc chắn đã xuất bản sao lưu gốc. Thao tác này xóa dữ liệu không đọc được khỏi trình duyệt.",
  "Saved deck storage reset. You can now save or import a valid backup.": "Đã đặt lại kho bộ bài. Bạn có thể lưu hoặc nhập bản sao lưu hợp lệ.", "Share link copied.": "Đã sao chép liên kết chia sẻ.", "Select and copy the share link manually.": "Hãy chọn và sao chép liên kết chia sẻ thủ công.",
  "A deck can contain at most 40 cards.": "Một bộ bài chứa tối đa 40 lá.", "Invalid deck format.": "Định dạng bộ bài không hợp lệ.", "Invalid card modifications.": "Tùy chỉnh bài không hợp lệ.",
  "Combatant not found in the local catalog.": "Không tìm thấy Combatant trong danh mục.", "Deck name must contain 1–120 characters.": "Tên bộ bài cần có từ 1 đến 120 ký tự.",
  "Choose one god and one normal epiphany per card.": "Mỗi lá chỉ được chọn một God và một Normal Epiphany.", "Incompatible card modification.": "Tùy chỉnh không tương thích với lá bài.",
  "Invalid equipment selection.": "Lựa chọn trang bị không hợp lệ.", "Partner not found.": "Không tìm thấy Partner.", "Invalid memory fragments.": "Memory Fragments không hợp lệ.",
  "Invalid memory fragment combination.": "Kết hợp Memory Fragments không hợp lệ.", "Memory fragments cannot exceed six pieces.": "Không thể chọn quá sáu Memory Fragments.", "Invalid PT limit.": "Giới hạn PT không hợp lệ.",
  "Expected a JSON array with at most 500 decks.": "Cần một danh sách JSON chứa tối đa 500 bộ bài.", "Share link is too large.": "Liên kết chia sẻ quá dài.", "Unsupported share link version.": "Phiên bản liên kết chia sẻ chưa được hỗ trợ.",
};

export function interfaceText(value: string, vietnamese: boolean): string {
  return vietnamese ? interfaceLabels[value] ?? label(value, true) : value;
}

export function useUiLanguage() {
  const vietnamese = useStoredValue(languageKey, "true") === "true";
  const t = useCallback((value: string) => interfaceText(value, vietnamese), [vietnamese]);
  return { vietnamese, t };
}
